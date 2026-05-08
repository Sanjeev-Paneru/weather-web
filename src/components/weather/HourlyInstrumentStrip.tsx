import React from "react";
import { HourlyForecast } from "@/src/types/DataType";
import { findNearestHourlyIndex } from "@/src/utiles/weatherPresentation";

function smallHash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function HourlyInstrumentStrip({
  nowISO,
  data,
}: {
  nowISO: string;
  data: HourlyForecast;
}) {
  const start = findNearestHourlyIndex(data, nowISO);
  const items = Array.from({ length: 12 }).map((_, i) => start + i).filter((i) => i < data.time.length);

  return (
    <section
      className="panel-shadow"
      style={{
        borderRadius: 12,
        padding: 16,
        background:
          "linear-gradient(135deg, rgba(61,43,31,0.92), rgba(44,31,20,0.96))",
        border: "1px solid rgba(0,0,0,0.55)",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="engraved-label">Hourly Forecast</div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-light)",
              fontSize: "1.35rem",
              textShadow: "0 2px 6px rgba(0,0,0,0.6)",
            }}
            className="mt-2"
          >
            Timeline Strip
          </h3>
        </div>
        <div style={{ color: "rgba(240,232,216,0.6)" }} className="text-sm">
          Scroll
        </div>
      </div>

      <div className="metal-divider" style={{ marginTop: 12, marginBottom: 14 }} />

      <div className="flex gap-3 overflow-x-auto pb-2">
        {items.map((idx) => {
          const t = new Date(data.time[idx]);
          const hour = t.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
          const temp = data.temperature_2m[idx];
          const precip = data.precipitation?.[idx] ?? 0;
          const wind = data.wind_speed_10m?.[idx] ?? 0;

          const rot = ((smallHash(data.time[idx]) % 200) - 100) / 140; // ≈ -0.7..0.7

          return (
            <article
              key={data.time[idx]}
              className="hover-lift"
              style={{
                minWidth: 160,
                borderRadius: 12,
                padding: 12,
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "2px solid rgba(138,134,128,0.85)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.22), 0 10px 18px rgba(0,0,0,0.45)",
                transform: `rotate(${rot}deg)`,
              }}
            >
              <div className="engraved-label" style={{ color: "rgba(26,15,0,0.6)" }}>
                {hour}
              </div>

              <div className="lcd-recess" style={{ marginTop: 10, padding: 10 }}>
                <div className="lcd-glow-green" style={{ fontSize: "1.25rem" }}>
                  {Math.round(temp)}°C
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs" style={{ letterSpacing: "0.06em" }}>
                <div>
                  <div className="engraved-label" style={{ color: "rgba(26,15,0,0.55)" }}>
                    Wind
                  </div>
                  <div style={{ fontFamily: "var(--font-lcd)", color: "rgba(26,15,0,0.85)" }}>
                    {Math.round(wind)}
                    <span style={{ fontSize: 10, marginLeft: 4 }}>km/h</span>
                  </div>
                </div>
                <div>
                  <div className="engraved-label" style={{ color: "rgba(26,15,0,0.55)" }}>
                    Precip
                  </div>
                  <div style={{ fontFamily: "var(--font-lcd)", color: "rgba(26,15,0,0.85)" }}>
                    {precip.toFixed(1)}
                    <span style={{ fontSize: 10, marginLeft: 4 }}>mm</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
