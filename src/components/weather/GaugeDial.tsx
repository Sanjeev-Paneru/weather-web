import React from "react";
import { clamp } from "@/src/utiles/weatherPresentation";

interface GaugeDialProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  glassTint?: string;
}

export default function GaugeDial({
  value,
  max,
  label,
  unit,
  color = "#ff6b6b",
  glassTint = "rgba(180,210,240,0.12)",
}: GaugeDialProps) {
  const safe = clamp(value, 0, max);
  // Aviation-style sweep: -90° .. +90°
  const rotation = (safe / max) * 180 - 90;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-44 h-44 rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(circle, #d0ccc4, #8a8680)",
          boxShadow:
            "inset 0 3px 14px rgba(0,0,0,0.55), 0 14px 24px rgba(0,0,0,0.65)",
          border: "10px solid rgba(0,0,0,0.55)",
        }}
      >
        {/* Bezel ring */}
        <div
          className="absolute inset-2 rounded-full"
          style={{
            border: "6px solid rgba(200,168,75,0.55)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 6px rgba(0,0,0,0.35)",
            background:
              "linear-gradient(145deg, rgba(184,168,152,0.35), rgba(138,122,106,0.25))",
          }}
        />

        {/* Dial face */}
        <div
          className="absolute inset-5 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #f5efe6 0%, #d4d0c8 35%, #a39d96 70%, #8a8680 100%)",
            border: "1px solid rgba(0,0,0,0.35)",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.35)",
          }}
        />

        {/* Etched tick marks */}
        <div className="absolute inset-0 rounded-full">
          {Array.from({ length: 25 }).map((_, i) => {
            const angle = (i / 24) * 180 - 90;
            const major = i % 4 === 0;
            const radius = major ? 70 : 74;
            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: major ? 2 : 1,
                  height: major ? 12 : 7,
                  background: major ? "rgba(26,15,0,0.65)" : "rgba(26,15,0,0.35)",
                  transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                  transformOrigin: "0 0",
                }}
              />
            );
          })}
        </div>

        {/* Needle mount (translated), needle rotates inside */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -64px)",
            width: 3,
            height: 70,
          }}
        >
          <div
            className="origin-bottom"
            style={{
              width: 3,
              height: 70,
              borderRadius: 3,
              background: "linear-gradient(to top, #7a0000, #ff3b30)",
              transform: "rotateZ(0deg)",
              animation: "gaugeNeedle 1.2s ease-out forwards",
              boxShadow: "0 2px 6px rgba(0,0,0,0.65)",
              ...( { "--rotation": `${rotation}deg` } as React.CSSProperties ),
            }}
          />
        </div>

        {/* Pivot */}
        <div
          className="absolute z-10"
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #ffd700, #b8860b)",
            border: "1px solid rgba(0,0,0,0.55)",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        />

        {/* Center value */}
        <div
          className="absolute text-center"
          style={{
            fontFamily: "var(--font-lcd)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color,
            textShadow: `0 0 6px ${color}66`,
          }}
        >
          {Math.round(safe)}
        </div>

        {/* Glass overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              `radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.22), transparent 55%), ${glassTint}`,
            border: "1px solid rgba(255,255,255,0.18)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="text-center">
        <div className="engraved-label">{label}</div>
        <div
          style={{ fontFamily: "var(--font-lcd)", color: "rgba(240,232,216,0.85)" }}
          className="text-sm"
        >
          {unit}
        </div>
      </div>
    </div>
  );
}
