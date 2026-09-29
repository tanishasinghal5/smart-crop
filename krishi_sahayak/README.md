# KrishiSahayak chat widget

The 🌱 chat bubble on every page of the site.

- `frontend/widget.js` adds the bubble to a page and opens `frontend/index.html` in it.
- `frontend/index.html`, `script.js` and `styles.css` are the chat window.
- Answers come from **Gemini** through `POST /api/chat` on the main Flask server (`server.py`). There is no separate chat server any more — run `python server.py` and the chat works.

Needs `GEMINI_API_KEY` in the root `.env` (see `.env.example`).

The old FastAPI + ChromaDB backend (port 8001), its Admin upload page and its Docker setup were removed on 2026-09-29. They are in git history if ever needed.
