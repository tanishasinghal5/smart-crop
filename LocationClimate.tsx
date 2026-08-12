/* ============================================================================
 * components/LocationClimate.tsx
 *
 * Location selection + weather, in one file. Drop it in and use it.
 *
 *   <LocationClimate onReady={(place, climate) => ...} />
 *
 * NO API KEYS REQUIRED. Nothing goes in .env.
 *   Geocoding  https://geocoding-api.open-meteo.com/v1/search      keyless
 *   Forecast   https://api.open-meteo.com/v1/forecast              keyless
 *   Archive    https://archive-api.open-meteo.com/v1/archive       keyless
 *   Reverse    https://api.bigdatacloud.net/data/reverse-geocode-client
 *                                                                  keyless
 *
 * Open-Meteo is free for non-commercial use (~10k calls/day) under CC BY 4.0.
 * Put "Weather data by Open-Meteo.com" in your footer and PDF.
 *
 * Requires: React 18+, Next.js App Router (or any client React).
 * No other dependencies.
 * ==========================================================================*/

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ==========================================================================
 * TYPES
 * ========================================================================*/

export type PlaceSource = "search" | "gps" | "offline";

export interface Place {
  id: number;
  name: string;          // "Nashik"
  state: string;         // admin1
  district: string;      // admin2
  taluka?: string;       // admin3
  lat: number;
  lng: number;
  elevation: number;     // metres, 0 if unknown
  population?: number;
  timezone: string;
  label: string;         // "Nashik, Nashik, Maharashtra"
  source: PlaceSource;
}

export type Season = "kharif" | "rabi" | "zaid";

export interface Climate {
  temperature: number;   // °C, current
  humidity: number;      // %, current
  rainfall: number;      // mm, CUMULATIVE for the season so far
  season: Season;
  seasonStart: string;   // ISO date the sum began
  daysOfData: number;    // how many days went into the sum
  forecastRainMm: number;// next 7 days, informational only
  fetchedAt: string;
  source: "api" | "partial";
}

/* ==========================================================================
 * ENDPOINTS
 * ========================================================================*/

const GEO_URL     = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";
const REVERSE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const COUNTRY = "IN";
const CLIMATE_TTL_MS = 3 * 60 * 60 * 1000;   // 3 hours
const GEO_TTL_MS     = 30 * 24 * 60 * 60 * 1000; // 30 days

/* ==========================================================================
 * OFFLINE FALLBACK
 * A small set so search still works with no network. Not all 750 districts —
 * shipping those would cost ~200KB to a user on mobile data.
 * ========================================================================*/

const OFFLINE_PLACES: Place[] = [
  ["Nashik", "Maharashtra", "Nashik", 19.997, 73.791, 570],
  ["Pune", "Maharashtra", "Pune", 18.520, 73.857, 560],
  ["Nagpur", "Maharashtra", "Nagpur", 21.146, 79.088, 310],
  ["Kolhapur", "Maharashtra", "Kolhapur", 16.705, 74.243, 570],
  ["Aurangabad", "Maharashtra", "Aurangabad", 19.877, 75.343, 570],
  ["Ludhiana", "Punjab", "Ludhiana", 30.901, 75.857, 244],
  ["Amritsar", "Punjab", "Amritsar", 31.634, 74.872, 234],
  ["Hisar", "Haryana", "Hisar", 29.153, 75.721, 215],
  ["Lucknow", "Uttar Pradesh", "Lucknow", 26.847, 80.947, 123],
  ["Varanasi", "Uttar Pradesh", "Varanasi", 25.318, 82.973, 81],
  ["Meerut", "Uttar Pradesh", "Meerut", 28.984, 77.706, 219],
  ["Patna", "Bihar", "Patna", 25.594, 85.138, 53],
  ["Bardhaman", "West Bengal", "Purba Bardhaman", 23.255, 87.856, 30],
  ["Guntur", "Andhra Pradesh", "Guntur", 16.306, 80.437, 33],
  ["Warangal", "Telangana", "Warangal", 17.978, 79.594, 302],
  ["Belagavi", "Karnataka", "Belagavi", 15.849, 74.498, 751],
  ["Mysuru", "Karnataka", "Mysuru", 12.295, 76.639, 763],
  ["Coimbatore", "Tamil Nadu", "Coimbatore", 11.017, 76.956, 411],
  ["Thanjavur", "Tamil Nadu", "Thanjavur", 10.787, 79.138, 59],
  ["Thrissur", "Kerala", "Thrissur", 10.527, 76.214, 2],
  ["Rajkot", "Gujarat", "Rajkot", 22.303, 70.802, 134],
  ["Junagadh", "Gujarat", "Junagadh", 21.522, 70.458, 107],
  ["Kota", "Rajasthan", "Kota", 25.213, 75.865, 271],
  ["Sri Ganganagar", "Rajasthan", "Sri Ganganagar", 29.924, 73.880, 178],
  ["Indore", "Madhya Pradesh", "Indore", 22.720, 75.858, 553],
  ["Jabalpur", "Madhya Pradesh", "Jabalpur", 23.181, 79.987, 411],
  ["Raipur", "Chhattisgarh", "Raipur", 21.251, 81.630, 298],
  ["Cuttack", "Odisha", "Cuttack", 20.463, 85.883, 36],
  ["Guwahati", "Assam", "Kamrup", 26.145, 91.736, 55],
  ["Shimla", "Himachal Pradesh", "Shimla", 31.104, 77.173, 2206],
  ["Srinagar", "Jammu and Kashmir", "Srinagar", 34.084, 74.797, 1585],
  ["Dehradun", "Uttarakhand", "Dehradun", 30.317, 78.032, 640],
].map(([name, state, district, lat, lng, elevation], i) => ({
  id: 900000 + i,
  name: name as string,
  state: state as string,
  district: district as string,
  lat: lat as number,
  lng: lng as number,
  elevation: elevation as number,
  timezone: "Asia/Kolkata",
  label: `${name}, ${state}`,
  source: "offline" as PlaceSource,
}));

/* ==========================================================================
 * CACHE  (localStorage, SSR-safe, silently degrades if unavailable)
 * ========================================================================*/

function cacheGet<T>(key: string, ttl: number): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw) as { t: number; v: T };
    if (Date.now() - t > ttl) {
      window.localStorage.removeItem(key);
      return null;
    }
    return v;
  } catch {
    return null;
  }
}

function cacheSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify({ t: Date.now(), v: value }));
  } catch {
    /* quota exceeded or private mode — caching is optional, never fatal */
  }
}

/* ==========================================================================
 * 1. SEARCH
 * ========================================================================*/

export async function searchPlaces(
  query: string,
  limit = 8,
  signal?: AbortSignal
): Promise<Place[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const cacheKey = `mruda:geo:${q.toLowerCase()}`;
  const hit = cacheGet<Place[]>(cacheKey, GEO_TTL_MS);
  if (hit) return hit;

  const url =
    `${GEO_URL}?name=${encodeURIComponent(q)}&count=${limit}` +
    `&language=en&format=json&countryCode=${COUNTRY}`;

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);

  const data = (await res.json()) as { results?: any[] };
  // Open-Meteo omits `results` entirely when nothing matches
  if (!data.results || data.results.length === 0) return [];

  const places: Place[] = data.results.map((r) => ({
    id: r.id,
    name: r.name,
    state: r.admin1 ?? "",
    district: r.admin2 ?? r.admin1 ?? "",
    taluka: r.admin3 ?? undefined,
    lat: r.latitude,
    lng: r.longitude,
    elevation: typeof r.elevation === "number" ? r.elevation : 0,
    population: r.population ?? undefined,
    timezone: r.timezone ?? "Asia/Kolkata",
    label: [r.name, r.admin2, r.admin1].filter(Boolean).join(", "),
    source: "search" as PlaceSource,
  }));

  if (places.length) cacheSet(cacheKey, places);
  return places;
}

export function searchOffline(query: string, limit = 8): Place[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  return OFFLINE_PLACES.filter((p) =>
    p.label.toLowerCase().includes(needle) ||
    p.district.toLowerCase().includes(needle)
  ).slice(0, limit);
}

/* ==========================================================================
 * 2. REVERSE GEOCODE (GPS coords -> readable name)
 * ========================================================================*/

export async function reverseGeocode(lat: number, lng: number): Promise<Place> {
  const fallback: Place = {
    id: 0,
    name: "Your location",
    state: "",
    district: "",
    lat,
    lng,
    elevation: 0,
    timezone: "Asia/Kolkata",
    label: `${lat.toFixed(3)}, ${lng.toFixed(3)}`,
    source: "gps",
  };

  try {
    const res = await fetch(
      `${REVERSE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (!res.ok) return fallback;
    const d = (await res.json()) as any;

    const admins: any[] = d.localityInfo?.administrative ?? [];
    const district =
      admins.find((a) => a.adminLevel === 5)?.name ??
      admins.find((a) => a.adminLevel === 6)?.name ??
      d.city ??
      "";

    const name = d.locality || d.city || district || "Your location";
    const state = d.principalSubdivision ?? "";

    return {
      ...fallback,
      name,
      state,
      district,
      label: [name, state].filter(Boolean).join(", ") || fallback.label,
    };
  } catch {
    // A failed name lookup must never block the reading — coords are enough.
    return fallback;
  }
}

/* ==========================================================================
 * 3. SEASON
 *
 * Monsoon onset is not one national date. It reaches Kerala around 1 June and
 * Punjab around 1 July, moving north. Summing kharif rainfall from a fixed
 * 1 June over-counts by up to a month in the north, which biases every
 * recommendation, since rainfall is one of the seven model features.
 *
 * This linear approximation by latitude is crude but far closer than a
 * constant. Replace with IMD onset dates if you obtain them.
 * ========================================================================*/

export function seasonFor(
  today: Date,
  lat: number
): { season: Season; start: Date } {
  const m = today.getMonth() + 1;
  const y = today.getFullYear();
  const onsetOffsetDays = Math.round(Math.max(0, Math.min(30, (lat - 8) * 1.15)));

  if (m >= 6 && m <= 9) {
    const start = new Date(y, 5, 1); // 1 June
    start.setDate(start.getDate() + onsetOffsetDays);
    return { season: "kharif", start };
  }
  if (m >= 10 || m <= 2) {
    const rabiYear = m >= 10 ? y : y - 1;
    return { season: "rabi", start: new Date(rabiYear, 9, 1) }; // 1 Oct
  }
  return { season: "zaid", start: new Date(y, 2, 1) }; // 1 Mar
}

const toISODate = (d: Date): string => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/* ==========================================================================
 * 4. CLIMATE
 *
 * The model wants CUMULATIVE seasonal rainfall in mm, not today's rain. That
 * total only exists in the ARCHIVE endpoint. Passing a daily figure makes
 * every recommendation wrong with no visible symptom — so both calls run.
 * ========================================================================*/

export async function fetchClimate(
  place: Place,
  today: Date = new Date()
): Promise<Climate> {
  const { season, start } = seasonFor(today, place.lat);

  // The archive lags real time by ~5 days; asking beyond that returns nulls.
  const archiveEnd = new Date(today);
  archiveEnd.setDate(archiveEnd.getDate() - 5);
  const useArchive = archiveEnd.getTime() > start.getTime();

  const forecastReq = fetch(
    `${FORECAST_URL}?latitude=${place.lat}&longitude=${place.lng}` +
      `&current=temperature_2m,relative_humidity_2m` +
      `&daily=precipitation_sum&forecast_days=7&timezone=auto`
  ).then((r) => {
    if (!r.ok) throw new Error(`Forecast failed: ${r.status}`);
    return r.json();
  });

  const archiveReq = useArchive
    ? fetch(
        `${ARCHIVE_URL}?latitude=${place.lat}&longitude=${place.lng}` +
          `&start_date=${toISODate(start)}&end_date=${toISODate(archiveEnd)}` +
          `&daily=precipitation_sum&timezone=auto`
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    : Promise.resolve(null);

  const [forecast, archive] = await Promise.all([forecastReq, archiveReq]);

  const archiveDaily: (number | null)[] = archive?.daily?.precipitation_sum ?? [];
  const seasonRain = archiveDaily.reduce<number>((a, v) => a + (v ?? 0), 0);

  const forecastDaily: (number | null)[] = forecast?.daily?.precipitation_sum ?? [];
  const forecastRain = forecastDaily.reduce<number>((a, v) => a + (v ?? 0), 0);

  // Bridge the archive's 5-day lag using the first days of the forecast record
  const bridge = forecastDaily.slice(0, 5).reduce<number>((a, v) => a + (v ?? 0), 0);

  return {
    temperature: Math.round((forecast?.current?.temperature_2m ?? 0) * 10) / 10,
    humidity: Math.round(forecast?.current?.relative_humidity_2m ?? 0),
    rainfall: Math.round(seasonRain + bridge),
    season,
    seasonStart: toISODate(start),
    daysOfData: archiveDaily.length,
    forecastRainMm: Math.round(forecastRain),
    fetchedAt: new Date().toISOString(),
    source: useArchive && archiveDaily.length > 0 ? "api" : "partial",
  };
}

export async function getClimateCached(place: Place): Promise<Climate> {
  const key = `mruda:climate:${place.lat.toFixed(2)},${place.lng.toFixed(2)}`;
  const hit = cacheGet<Climate>(key, CLIMATE_TTL_MS);
  if (hit) return hit;
  const fresh = await fetchClimate(place);
  cacheSet(key, fresh);
  return fresh;
}

/* ==========================================================================
 * 5. ELEVATION SANITY CHECK
 *
 * The model sees temperature, humidity and rainfall — never altitude. So it
 * will cheerfully suggest apple for a warm, wet, 500m plain, because the
 * weather looks plausible. Elevation from the geocoder catches what the
 * features cannot. Show as a caution, not a hard filter — micro-climates exist.
 * ========================================================================*/

const ELEVATION_RANGE: Record<string, [number, number]> = {
  apple: [1500, 3000],
  coffee: [600, 1800],
  grapes: [200, 1200],
  orange: [200, 1500],
  mango: [0, 1200],
  coconut: [0, 900],
  rice: [0, 2000],
};

export function elevationWarning(crop: string, elevation: number): string | null {
  const range = ELEVATION_RANGE[crop.toLowerCase()];
  if (!range || !elevation) return null;
  const [lo, hi] = range;
  const m = Math.round(elevation);
  if (elevation < lo)
    return `${crop} is normally grown above ${lo} m. Your location is about ${m} m.`;
  if (elevation > hi)
    return `${crop} is normally grown below ${hi} m. Your location is about ${m} m.`;
  return null;
}

/* ==========================================================================
 * 6. HOOK
 * ========================================================================*/

export function useLocationClimate() {
  const [place, setPlaceState] = useState<Place | null>(null);
  const [climate, setClimate] = useState<Climate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore the last place so a returning user isn't asked again
  useEffect(() => {
    const saved = cacheGet<Place>("mruda:place", GEO_TTL_MS);
    if (saved) setPlaceState(saved);
  }, []);

  const setPlace = useCallback((p: Place | null) => {
    setPlaceState(p);
    // A new location invalidates the old climate. Never keep stale numbers.
    setClimate(null);
    setError(null);
    if (p) cacheSet("mruda:place", p);
  }, []);

  useEffect(() => {
    if (!place) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    getClimateCached(place)
      .then((c) => {
        if (!cancelled) setClimate(c);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't fetch weather. Check your connection.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [place]);

  return { place, setPlace, climate, loading, error };
}

/* ==========================================================================
 * 7. COMPONENT
 * ========================================================================*/

export interface LocationClimateProps {
  /** Fires whenever both a place and its climate are available. */
  onReady?: (place: Place, climate: Climate) => void;
  /** Fires when the user clears or changes the location. */
  onClear?: () => void;
  className?: string;
}

export default function LocationClimate({
  onReady,
  onClear,
  className = "",
}: LocationClimateProps) {
  const { place, setPlace, climate, loading, error } = useLocationClimate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [status, setStatus] = useState<
    "idle" | "searching" | "empty" | "locating" | "offline"
  >("idle");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (place && climate && onReady) onReady(place, climate);
  }, [place, climate, onReady]);

  /* -- debounced search, with abort so a slow early request cannot
        overwrite a fast later one ------------------------------------- */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setStatus("idle");
      return;
    }

    setStatus("searching");
    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const found = await searchPlaces(q, 8, controller.signal);
        setResults(found);
        setStatus(found.length ? "idle" : "empty");
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return;
        const local = searchOffline(q);
        setResults(local);
        setStatus(local.length ? "offline" : "empty");
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const useGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("empty");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const p = await reverseGeocode(coords.latitude, coords.longitude);
        setPlace(p);
        setQuery("");
        setResults([]);
        setStatus("idle");
      },
      () => setStatus("idle"), // denial is a choice, not an error
      { timeout: 10000, maximumAge: 300000, enableHighAccuracy: false }
    );
  }, [setPlace]);

  const clear = () => {
    setPlace(null);
    setQuery("");
    setResults([]);
    setStatus("idle");
    onClear?.();
  };

  /* ------------------------------------------------------------------ */

  if (place) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="rounded-xl border p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-60">
                {place.source === "gps" ? "From your location" : "Field location"}
              </div>
              <div className="text-lg">{place.label}</div>
              {place.elevation > 0 && (
                <div className="text-xs opacity-60">
                  {Math.round(place.elevation)} m elevation
                </div>
              )}
            </div>
            <button
              onClick={clear}
              className="text-[11px] uppercase tracking-[0.18em] underline opacity-70"
            >
              Change
            </button>
          </div>

          <div className="mt-4 border-t pt-3">
            {loading && <p className="text-sm opacity-60">Fetching weather…</p>}
            {error && <p className="text-sm opacity-80">{error}</p>}

            {climate && (
              <>
                <dl className="space-y-1 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="opacity-60">Temperature</dt>
                    <dd className="tabular-nums">{climate.temperature} °C</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="opacity-60">Humidity</dt>
                    <dd className="tabular-nums">{climate.humidity} %</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="opacity-60">
                      Rainfall since {new Date(climate.seasonStart).toLocaleDateString(
                        "en-IN", { day: "numeric", month: "short" })}
                    </dt>
                    <dd className="tabular-nums">{climate.rainfall} mm</dd>
                  </div>
                </dl>

                <p className="mt-3 text-xs opacity-60">
                  {climate.season.charAt(0).toUpperCase() + climate.season.slice(1)} season
                  {" · "}
                  {climate.daysOfData} days of records
                  {climate.forecastRainMm > 0 &&
                    ` · ${climate.forecastRainMm} mm expected in the next 7 days`}
                </p>

                {climate.source === "partial" && (
                  <p className="mt-2 text-xs opacity-70">
                    Limited rainfall history for this season so far — the total may
                    be low.
                  </p>
                )}

                <p className="mt-2 text-[11px] opacity-50">
                  Weather data by Open-Meteo.com
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <label
        htmlFor="mruda-location"
        className="block text-[11px] uppercase tracking-[0.2em] opacity-60"
      >
        Where is your field?
      </label>

      <input
        id="mruda-location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Village, town or district"
        autoComplete="off"
        enterKeyHint="search"
        className="w-full rounded-xl border px-4 py-3 text-[17px]"
      />

      <button
        onClick={useGPS}
        className="text-[12px] uppercase tracking-[0.18em] underline opacity-80"
      >
        {status === "locating" ? "Finding you…" : "Use my current location"}
      </button>

      {status === "searching" && <p className="text-sm opacity-60">Searching…</p>}

      {status === "offline" && (
        <p className="text-sm opacity-70">
          Offline — showing major districts only.
        </p>
      )}

      {status === "empty" && (
        <p className="text-sm opacity-70">
          No match for “{query}”. Try the nearest larger town, or your district
          name.
        </p>
      )}

      {results.length > 0 && (
        <ul className="divide-y overflow-hidden rounded-xl border">
          {results.map((p) => (
            <li key={`${p.id}-${p.lat}-${p.lng}`}>
              <button
                onClick={() => {
                  setPlace(p);
                  setQuery("");
                  setResults([]);
                }}
                className="w-full px-4 py-3 text-left"
              >
                <div className="text-[17px]">{p.name}</div>
                <div className="text-xs opacity-60">
                  {[p.taluka, p.district, p.state].filter(Boolean).join(" · ")}
                  {p.elevation > 0 && ` · ${Math.round(p.elevation)} m`}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
