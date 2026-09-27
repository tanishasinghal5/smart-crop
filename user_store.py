"""Where user accounts live.

FirestoreUserStore is the default: Cloud Run's disk is wiped on every deploy,
so a SQLite file there loses every account. SqliteUserStore keeps the old
behaviour and is the emergency fallback (AUTH_STORE=sqlite).

Both return users as plain dicts with the same keys:
id, phone, username, pin_hash, google_sub, email, created_at
"""
import os
import sqlite3
import time

USER_FIELDS = ('phone', 'username', 'pin_hash', 'google_sub', 'email')
# Fields that must be unique across users, and the Firestore collection that
# enforces it (Firestore has no UNIQUE constraint, so each claimed value gets a
# document whose id is the value itself).
UNIQUE_INDEXES = {'phone': 'phones', 'google_sub': 'google_ids'}


class DuplicateError(Exception):
    """Another account already has this phone number or Google account."""

    def __init__(self, field):
        super().__init__(field)
        self.field = field


class StoreUnavailable(Exception):
    """The user store could not be reached."""


def _now():
    return time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())


class SqliteUserStore:
    def __init__(self, path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        self._path = path
        with self._connect() as conn:
            conn.execute('''CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                phone TEXT UNIQUE,
                username TEXT NOT NULL,
                pin_hash TEXT,
                google_sub TEXT UNIQUE,
                email TEXT,
                created_at TEXT NOT NULL DEFAULT (datetime('now')))''')

    def _connect(self):
        conn = sqlite3.connect(self._path)
        conn.row_factory = sqlite3.Row
        return conn

    def _one(self, sql, args):
        with self._connect() as conn:
            row = conn.execute(sql, args).fetchone()
        return dict(row) if row else None

    def get(self, user_id):
        return self._one('SELECT * FROM users WHERE id = ?', (user_id,)) if user_id else None

    def by_phone(self, phone):
        return self._one('SELECT * FROM users WHERE phone = ?', (phone,)) if phone else None

    def by_google_sub(self, sub):
        return self._one('SELECT * FROM users WHERE google_sub = ?', (sub,)) if sub else None

    @staticmethod
    def _duplicate(exc):
        return DuplicateError('google_sub' if 'google_sub' in str(exc) else 'phone')

    def create(self, username, phone=None, pin_hash=None, google_sub=None, email=None):
        try:
            with self._connect() as conn:
                cursor = conn.execute(
                    'INSERT INTO users (phone, username, pin_hash, google_sub, email) '
                    'VALUES (?, ?, ?, ?, ?)', (phone, username, pin_hash, google_sub, email))
                user_id = cursor.lastrowid
        except sqlite3.IntegrityError as exc:
            raise self._duplicate(exc) from exc
        return self.get(user_id)

    def update(self, user_id, **fields):
        fields = {k: v for k, v in fields.items() if k in USER_FIELDS}
        if fields:
            assignments = ', '.join(f'{k} = ?' for k in fields)
            try:
                with self._connect() as conn:
                    conn.execute(f'UPDATE users SET {assignments} WHERE id = ?',
                                 (*fields.values(), user_id))
            except sqlite3.IntegrityError as exc:
                raise self._duplicate(exc) from exc
        return self.get(user_id)

    def delete(self, user_id):
        with self._connect() as conn:
            conn.execute('DELETE FROM users WHERE id = ?', (user_id,))


class FirestoreUserStore:
    def __init__(self, project):
        try:
            from google.cloud import firestore
            self._firestore = firestore
            self._db = firestore.Client(project=project)
        except Exception as exc:  # noqa: BLE001 — missing library or credentials
            raise StoreUnavailable(f'{type(exc).__name__}: {exc}') from exc
        self._users = self._db.collection('users')

    def _index(self, field, value):
        return self._db.collection(UNIQUE_INDEXES[field]).document(value)

    def get(self, user_id):
        if not user_id:
            return None
        snap = self._users.document(str(user_id)).get()
        if not snap.exists:
            return None
        return {**snap.to_dict(), 'id': snap.id}

    def _by_index(self, field, value):
        if not value:
            return None
        snap = self._index(field, value).get()
        return self.get(snap.get('user_id')) if snap.exists else None

    def by_phone(self, phone):
        return self._by_index('phone', phone)

    def by_google_sub(self, sub):
        return self._by_index('google_sub', sub)

    def create(self, username, phone=None, pin_hash=None, google_sub=None, email=None):
        ref = self._users.document()
        data = {'phone': phone, 'username': username, 'pin_hash': pin_hash,
                'google_sub': google_sub, 'email': email, 'created_at': _now()}
        claims = [self._index(f, data[f]) for f in UNIQUE_INDEXES if data[f]]

        @self._firestore.transactional
        def run(txn):
            # Reads first, then writes — a Firestore transaction rule. Two
            # sign-ups racing for one phone number cannot both succeed.
            for field, claim in zip([f for f in UNIQUE_INDEXES if data[f]], claims):
                if claim.get(transaction=txn).exists:
                    raise DuplicateError(field)
            txn.set(ref, data)
            for claim in claims:
                txn.set(claim, {'user_id': ref.id})

        run(self._db.transaction())
        return {**data, 'id': ref.id}

    def update(self, user_id, **fields):
        fields = {k: v for k, v in fields.items() if k in USER_FIELDS}
        ref = self._users.document(str(user_id))

        @self._firestore.transactional
        def run(txn):
            current = ref.get(transaction=txn).to_dict() or {}
            claim, release = [], []
            for field in UNIQUE_INDEXES:
                if field not in fields or fields[field] == current.get(field):
                    continue
                new_value = fields[field]
                if new_value:
                    new_ref = self._index(field, new_value)
                    snap = new_ref.get(transaction=txn)
                    if snap.exists and snap.get('user_id') != ref.id:
                        raise DuplicateError(field)
                    claim.append(new_ref)
                if current.get(field):
                    release.append(self._index(field, current[field]))
            txn.update(ref, fields)
            for new_ref in claim:
                txn.set(new_ref, {'user_id': ref.id})
            for old_ref in release:
                txn.delete(old_ref)

        if fields:
            run(self._db.transaction())
        return self.get(user_id)

    def delete(self, user_id):
        ref = self._users.document(str(user_id))

        @self._firestore.transactional
        def run(txn):
            current = ref.get(transaction=txn).to_dict() or {}
            txn.delete(ref)
            for field in UNIQUE_INDEXES:
                if current.get(field):
                    txn.delete(self._index(field, current[field]))  # frees the phone for reuse

        run(self._db.transaction())
