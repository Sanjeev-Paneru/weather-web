"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { searchCity } from "@/src/services/geoService";
import { CityResult } from "@/src/types/DataType";

interface SearchCityProps {
  onSelectCity: (city: CityResult) => void;
}

export default function SearchCity({ onSelectCity }: SearchCityProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query) return setResults([]);

      setLoading(true);
      searchCity(query)
        .then((data: CityResult[] | undefined) => setResults(data || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search city..."
        className="w-full p-3 rounded-xl bg-white shadow text-black focus:outline-none"
      />

      {loading && isHover && (
        <p className="absolute left-0 mt-2 text-sm text-gray-600">
          Searching...
        </p>
      )}

      {results.length > 0 && isHover && (
        <ul className="absolute w-full bg-white shadow-lg rounded-xl mt-2 max-h-60 overflow-auto z-20">
          {results.map((city) => (
            <li
              key={city.id}
              onClick={() => {
                onSelectCity(city);
                setQuery(city.name);
                setResults([]);
              }}
              className="p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-none"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
