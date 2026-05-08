"use client";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { searchCity } from "@/src/services/geoService";
import { CityResult } from "@/src/types/DataType";

interface SearchCityProps {
  onSelectCity: (city: CityResult) => void;
}

export default function SearchCity({ onSelectCity }: SearchCityProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      searchCity(query)
        .then((data: CityResult[] | undefined) => setResults(data || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const showDropdown = open && (loading || results.length > 0);

  return (
    <div ref={rootRef} className="w-full relative">
      <style>{`
        .search-input {
          font-family: var(--font-body);
          color: var(--text-primary);
          background: linear-gradient(to bottom, #f5efe6, #ede5d8);
        }
        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(200, 168, 75, 0.5);
        }
      `}</style>

      <div
        className="p-1 rounded-lg panel-shadow"
        style={{
          background: "linear-gradient(145deg, #b8a898, #8a7a6a)",
          border: "1px solid #5a4030",
        }}
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search city..."
          className="search-input w-full px-4 py-3 rounded text-sm focus:outline-none"
        />
      </div>

      {loading && open && (
        <p
          style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
          className="absolute left-0 mt-2"
        >
          <span
            className="inline-flex items-center gap-2"
            style={{ color: "rgba(240,232,216,0.7)" }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M10.5 18.5a8 8 0 1 1 5.2-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 16l5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Searching…
          </span>
        </p>
      )}

      {showDropdown && (
        <ul
          className="absolute w-full shadow-lg rounded-lg mt-2 max-h-60 overflow-auto z-20"
          style={{
            background: "var(--bg-card)",
            border: "2px solid #8a8680",
            boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
          }}
        >
          {results.map((city) => (
            <li
              key={city.id}
              onMouseDown={(e) => {
                // Prevent input blur from closing before selection.
                e.preventDefault();
                onSelectCity(city);
                setQuery(city.name);
                setResults([]);
                setOpen(false);
              }}
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-primary)",
                borderBottom: "1px dashed rgba(0,0,0,0.2)",
              }}
              className="px-4 py-3 cursor-pointer hover:bg-yellow-50 transition-colors last:border-none"
            >
              {city.name}, {city.country}
            </li>
          ))}

          {!loading && results.length === 0 && (
            <li
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(26,15,0,0.65)",
              }}
              className="px-4 py-3"
            >
              No matches.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}


