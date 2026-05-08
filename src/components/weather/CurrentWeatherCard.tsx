import React from "react";
import { CurrentWeather, DailyForecast, HourlyForecast } from "@/src/types/DataType";
import ConditionJournalCard from "./ConditionJournalCard";
import { buildNarrative, describeWeatherCode } from "@/src/utiles/weatherPresentation";

interface CurrentWeatherCardProps {
  data: CurrentWeather;
  cityName: string;
  hourly: HourlyForecast;
  daily: DailyForecast;
}

export default function CurrentWeatherCard({
  data,
  cityName,
  hourly,
  daily,
}: CurrentWeatherCardProps) {
  // Thermometer fill based on temperature (normalized -30..45°C for a more realistic UI)
  const tempPercent = Math.max(0, Math.min(100, ((data.temperature + 30) / 75) * 100));
  const feelsLikeEst = Math.round((data.temperature - data.windspeed * 0.05) * 10) / 10;

  const desc = describeWeatherCode(data.weathercode);
  const narrative = buildNarrative({ nowISO: data.time, hourly, daily }) ||
    "Conditions calibrated. Consult instruments for the next window.";

  return (
    <section
      className="panel-shadow"
      style={{
        borderRadius: 12,
        padding: 18,
        background:
          "linear-gradient(135deg, rgba(61,43,31,0.90), rgba(44,31,20,0.96))",
        border: "1px solid rgba(0,0,0,0.55)",
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="engraved-label">Atmospheric Observatory</div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.1rem",
              color: "var(--text-light)",
              textShadow: "0 3px 10px rgba(0,0,0,0.75)",
            }}
            className="mt-2"
          >
            {cityName}
          </h2>
          <div
            style={{ color: "rgba(240,232,216,0.72)", letterSpacing: "0.06em" }}
            className="mt-1 text-sm"
          >
            {desc.title} • {new Date(data.time).toLocaleString()}
          </div>
        </div>

        <div
          className="brass-plaque"
          style={{
            borderRadius: 12,
            padding: "10px 12px",
            color: "rgba(26,15,0,0.82)",
          }}
        >
          <div className="engraved-label" style={{ color: "rgba(26,15,0,0.65)" }}>
            System Time
          </div>
          <div style={{ fontFamily: "var(--font-lcd)", fontSize: "1.1rem" }}>
            {new Date(data.time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>

      <div className="metal-divider" style={{ marginTop: 14, marginBottom: 18 }} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* Thermometer module */}
        <div className="xl:col-span-3">
          <div
            className="leather-card panel-shadow"
            style={{ padding: 16, borderRadius: 12, height: "100%" }}
          >
            <div className="engraved-label">Temperature</div>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative" style={{ width: 86, height: 270 }}>
                {/* Brass cap */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    transform: "translateX(-50%)",
                    width: 58,
                    height: 10,
                    borderRadius: 999,
                    background: "radial-gradient(circle at 30% 30%, #ffd700, #b8860b)",
                    border: "1px solid rgba(0,0,0,0.55)",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
                    zIndex: 2,
                  }}
                />

                {/* Glass tube */}
                <div
                  className="glass-effect"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 8,
                    transform: "translateX(-50%)",
                    width: 44,
                    height: 220,
                    borderRadius: 999,
                    border: "2px solid rgba(212,208,200,0.65)",
                    boxShadow:
                      "inset 0 2px 10px rgba(0,0,0,0.45), 0 10px 20px rgba(0,0,0,0.55)",
                    overflow: "hidden",
                  }}
                >
                  {/* Etched markers */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: 6,
                        right: 6,
                        top: 18 + i * 22,
                        height: 1,
                        background: i % 2 === 0 ? "rgba(26,15,0,0.35)" : "rgba(26,15,0,0.18)",
                      }}
                    />
                  ))}

                  {/* Mercury */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 12,
                      transform: "translateX(-50%)",
                      width: 18,
                      borderRadius: 999,
                      background:
                        "linear-gradient(to top, #7a0000, #ff3b30)",
                      height: `${tempPercent}%`,
                      animation: "thermometerFill 1.5s ease-out",
                      ...( { "--fill-height": `${tempPercent}%` } as React.CSSProperties ),
                      boxShadow: "0 0 10px rgba(255,59,48,0.35)",
                    }}
                  />
                </div>

                {/* Bulb */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 0,
                    transform: "translate(-50%, 20px)",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 30%, #ff6b6b, #7a0000)",
                    border: "2px solid rgba(212,208,200,0.55)",
                    boxShadow:
                      "inset 0 2px 10px rgba(0,0,0,0.35), 0 14px 22px rgba(0,0,0,0.65)",
                  }}
                />
              </div>

              <div className="flex-1">
                <div className="lcd-recess" style={{ padding: 14 }}>
                  <div className="engraved-label" style={{ color: "rgba(240,232,216,0.6)" }}>
                    Current
                  </div>
                  <div
                    className="lcd-glow-green"
                    style={{
                      fontSize: "2.4rem",
                      fontWeight: 800,
                      animation: "lcdFlicker 180ms ease-in-out",
                    }}
                  >
                    {Math.round(data.temperature)}°
                  </div>
                  <div className="engraved-label" style={{ marginTop: 6, color: "rgba(240,232,216,0.6)" }}>
                    Feels like (est.) {feelsLikeEst}°
                  </div>
                </div>

                <div
                  className="mt-3"
                  style={{
                    color: "rgba(240,232,216,0.75)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                  }}
                >
                  {narrative}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Giant LCD hero readout */}
        <div className="xl:col-span-5">
          <div
            className="panel-shadow hover-lift"
            style={{
              height: "100%",
              borderRadius: 12,
              padding: 18,
              background:
                "linear-gradient(135deg, rgba(61,43,31,0.92), rgba(44,31,20,0.96))",
              border: "1px solid rgba(0,0,0,0.55)",
            }}
          >
            <div className="engraved-label">Primary Readout</div>

            <div className="mt-4 lcd-recess" style={{ padding: 18 }}>
              <div
                className="lcd-glow-green"
                style={{
                  fontSize: "4rem",
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                  animation: "lcdFlicker 200ms ease-in-out",
                }}
              >
                {Math.round(data.temperature)}°C
              </div>
              <div
                className="engraved-label"
                style={{ marginTop: 10, color: "rgba(240,232,216,0.65)" }}
              >
                Wind {Math.round(data.windspeed)} km/h • Bearing {Math.round(data.winddirection)}°
              </div>
            </div>

            <div
              className="mt-4 aged-paper"
              style={{
                borderRadius: 12,
                padding: 16,
                border: "2px solid rgba(138,134,128,0.85)",
              }}
            >
              <div className="engraved-label" style={{ color: "rgba(26,15,0,0.6)" }}>
                Planning Insight
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-primary)",
                  fontSize: "1.05rem",
                  lineHeight: 1.55,
                }}
                className="mt-2"
              >
                {narrative}
              </p>
            </div>
          </div>
        </div>

        {/* Condition journal */}
        <div className="xl:col-span-4">
          <ConditionJournalCard weathercode={data.weathercode} narrative={narrative} />
        </div>
      </div>
    </section>
  );
}
