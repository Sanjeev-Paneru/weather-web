import React from "react";
import { CurrentWeather, DailyForecast, HourlyForecast } from "@/src/types/DataType";
import GaugeDial from "./GaugeDial";
import LCDPanel from "./LCDPanel";
import SunArcDial from "./SunArcDial";
import { findNearestHourlyIndex } from "@/src/utiles/weatherPresentation";

export default function ScientificInstrumentsPanel({
  current,
  hourly,
  daily,
}: {
  current: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
}) {
  const idx = findNearestHourlyIndex(hourly, current.time);
  const visibilityM = hourly.visibility?.[idx];
  const visibilityKm = typeof visibilityM === "number" ? visibilityM / 1000 : null;

  const uv = daily.uv_index_max?.[0];
  const sunrise = daily.sunrise?.[0];
  const sunset = daily.sunset?.[0];

  return (
    <section className="leather-card panel-shadow" style={{ padding: 18, borderRadius: 12 }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="engraved-label">Scientific Modules</div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-light)",
              fontSize: "1.35rem",
              textShadow: "0 2px 6px rgba(0,0,0,0.6)",
            }}
            className="mt-2"
          >
            Instrument Cluster
          </h3>
        </div>
      </div>

      <div className="metal-divider" style={{ marginTop: 12, marginBottom: 16 }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GaugeDial value={current.windspeed} max={120} label="Wind Speed" unit="km/h" color="#ff6b6b" />
          <GaugeDial value={current.winddirection % 360} max={360} label="Wind Direction" unit="°" color="#87ceeb" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GaugeDial
            value={visibilityKm ?? 0}
            max={20}
            label="Visibility"
            unit="km"
            color="#7fd3ff"
          />
          <LCDPanel
            label="UV Index (Max)"
            value={typeof uv === "number" ? Math.round(uv) : "—"}
            color="#ffb347"
          />
        </div>

        <div>
          {sunrise && sunset ? (
            <SunArcDial nowISO={current.time} sunriseISO={sunrise} sunsetISO={sunset} />
          ) : (
            <div
              className="panel-shadow"
              style={{
                borderRadius: 12,
                padding: 16,
                background:
                  "linear-gradient(135deg, rgba(61,43,31,0.92), rgba(44,31,20,0.96))",
                border: "1px solid rgba(0,0,0,0.55)",
              }}
            >
              <div className="engraved-label">Sunrise / Sunset</div>
              <div className="lcd-recess" style={{ padding: 12, marginTop: 10 }}>
                <div className="lcd-glow-amber" style={{ fontSize: "1.1rem" }}>
                  —
                </div>
                <div className="engraved-label" style={{ marginTop: 8, color: "rgba(240,232,216,0.6)" }}>
                  Not available
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
