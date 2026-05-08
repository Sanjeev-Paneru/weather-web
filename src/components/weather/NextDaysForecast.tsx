import React from "react";
import { DailyForecast } from "@/src/types/DataType";

interface NextDaysForecastProps {
  data: DailyForecast;
}

function stableRotationDeg(seed: string) {
  // Deterministic small rotation to avoid hydration mismatch in Next.js.
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const t = (h >>> 0) / 2 ** 32; // 0..1
  return (t * 2 - 1) * 1.2; // -1.2..1.2
}

function TinyGlyph({ kind }: { kind: "rain" | "uv" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (kind === "rain") {
    return (
      <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="M8 14c-2.8 0-5-2.2-5-5s2.4-5.5 5.6-5.5c2.2 0 4.1 1.2 5 3 0.6-0.4 1.3-0.5 2-0.5 2.6 0 4.7 2.1 4.7 4.7S23.2 14 20.6 14H8z" />
        <path {...common} d="M10 16l-1.5 3" />
        <path {...common} d="M15 16l-1.5 3" />
      </svg>
    );
  }

  return (
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
      <path {...common} d="M12 3v2" />
      <path {...common} d="M12 19v2" />
      <path {...common} d="M4.2 6.2l1.4 1.4" />
      <path {...common} d="M18.4 18.4l1.4 1.4" />
      <path {...common} d="M3 12h2" />
      <path {...common} d="M19 12h2" />
      <path {...common} d="M6.2 19.8l1.4-1.4" />
      <path {...common} d="M18.4 5.6l1.4-1.4" />
      <circle {...common} cx="12" cy="12" r="4" />
    </svg>
  );
}

export default function NextDaysForecast({ data }: NextDaysForecastProps) {
  return (
    <section
      className="w-full p-8 mt-6 rounded-lg corkboard-bg panel-shadow"
      style={{ minHeight: 280 }}
    >
      <h3
        style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--text-light)" }}
        className="mb-6 text-center"
      >
        Forecast Notes
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.time.map((date, idx) => {
          const rotation = stableRotationDeg(`${date}-${idx}`);

          return (
            <article
              key={date}
              className="aged-paper flex-shrink-0 rounded-lg p-4 flex flex-col items-center gap-2 relative hover-lift"
              style={{
                minWidth: 148,
                transform: `rotate(${rotation}deg)`,
                boxShadow: `${rotation > 0 ? -2 : 2}px 6px 16px rgba(0,0,0,0.65)`,
              }}
            >
              {/* Brass pin */}
              <div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #ffe28a, #c8a84b)",
                  border: "1px solid rgba(0,0,0,0.35)",
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              />

              <div
                style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}
                className="text-center mt-2"
              >
                <p className="text-gray-700 font-semibold">
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div
                style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}
                className="font-bold text-gray-900 text-center"
              >
                <span>{Math.round(data.temperature_2m_max[idx])}°</span>
                <span className="text-xs mx-1 text-gray-500">/</span>
                <span className="text-sm text-gray-700">
                  {Math.round(data.temperature_2m_min[idx])}°
                </span>
              </div>

              <div
                style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
                className="text-gray-700 text-center border-t border-gray-300 pt-2 w-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <span style={{ color: "rgba(26,15,0,0.65)" }}>
                    <TinyGlyph kind="rain" />
                  </span>
                  <span className="text-xs">{data.precipitation_sum[idx]} mm</span>
                </div>
              </div>

              <div
                style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
                className="text-gray-700 text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <span style={{ color: "rgba(26,15,0,0.65)" }}>
                    <TinyGlyph kind="uv" />
                  </span>
                  <span className="text-xs">UV {Math.round(data.uv_index_max[idx])}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
