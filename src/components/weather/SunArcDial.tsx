import React from "react";
import { formatClock } from "@/src/utiles/weatherPresentation";

export default function SunArcDial({
  nowISO,
  sunriseISO,
  sunsetISO,
}: {
  nowISO: string;
  sunriseISO: string;
  sunsetISO: string;
}) {
  const now = new Date(nowISO).getTime();
  const sunrise = new Date(sunriseISO).getTime();
  const sunset = new Date(sunsetISO).getTime();

  const daySpan = Math.max(1, sunset - sunrise);
  const progress = Math.max(0, Math.min(1, (now - sunrise) / daySpan));
  const angle = -90 + progress * 180;

  return (
    <section
      className="panel-shadow hover-lift"
      style={{
        borderRadius: 12,
        padding: 16,
        background:
          "linear-gradient(135deg, rgba(61,43,31,0.92), rgba(44,31,20,0.96))",
        border: "1px solid rgba(0,0,0,0.55)",
      }}
    >
      <div className="engraved-label">Sunrise / Sunset</div>

      <div className="mt-3 flex items-center gap-4">
        <div
          className="relative"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #d4d0c8, #8a8680 55%, #6f6b66)",
            border: "6px solid rgba(0,0,0,0.55)",
            boxShadow:
              "inset 0 2px 10px rgba(0,0,0,0.55), 0 10px 18px rgba(0,0,0,0.6)",
          }}
        >
          {/* Glass overlay */}
          <div
            className="glass-effect"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
            }}
          />

          {/* Etched ticks */}
          {Array.from({ length: 13 }).map((_, i) => {
            const a = -90 + (i / 12) * 180;
            const major = i % 3 === 0;
            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: major ? 2 : 1,
                  height: major ? 10 : 6,
                  background: "rgba(26,15,0,0.55)",
                  transform: `rotate(${a}deg) translateY(-52px)`,
                  transformOrigin: "0 0",
                }}
              />
            );
          })}

          {/* Needle mount + sweep */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 2,
              height: 48,
              transform: "translate(-50%, -46px)",
            }}
          >
            <div
              className="origin-bottom"
              style={{
                width: 2,
                height: 48,
                background: "linear-gradient(to top, #7a0000, #ff3b30)",
                transform: "rotateZ(0deg)",
                transformOrigin: "bottom center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
                borderRadius: 2,
                animation: "gaugeNeedle 1100ms ease-out forwards",
                ...( { "--rotation": `${angle}deg` } as React.CSSProperties ),
              }}
            />
          </div>

          {/* Pivot */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 14,
              height: 14,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle at 30% 30%, #ffd700, #b8860b)",
              border: "1px solid rgba(0,0,0,0.5)",
              boxShadow:
                "0 2px 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
              zIndex: 2,
            }}
          />
        </div>

        <div className="flex-1">
          <div className="lcd-recess" style={{ padding: 12 }}>
            <div className="lcd-glow-amber" style={{ fontSize: "1.1rem" }}>
              {formatClock(sunriseISO)}  —  {formatClock(sunsetISO)}
            </div>
            <div
              className="engraved-label"
              style={{ marginTop: 8, color: "rgba(240,232,216,0.6)" }}
            >
              Daylight Window
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
