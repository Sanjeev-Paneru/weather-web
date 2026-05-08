import React from "react";
import { describeWeatherCode } from "@/src/utiles/weatherPresentation";

function EngravedWeatherIcon({ code }: { code: number }) {
  // Simple engraved glyph set (stroke-only) to avoid flat emoji.
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  // Pick a glyph family based on high-level code groups.
  const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);
  const isSnow = [71, 73, 75].includes(code);
  const isFog = [45, 48].includes(code);
  const isStorm = [95, 96, 99].includes(code);

  return (
    <svg viewBox="0 0 64 64" width={44} height={44} aria-hidden="true">
      {/* Emboss illusion */}
      <g opacity={0.25} transform="translate(1 1)">
        <path {...commonProps} d="M18 38c-6 0-10-4-10-10s5-12 12-12c5 0 9 3 11 7 1-1 3-2 5-2 5 0 10 4 10 10s-4 10-10 10H18z" />
        {isRain && (
          <>
            <path {...commonProps} d="M24 42l-4 8" />
            <path {...commonProps} d="M36 42l-4 8" />
            <path {...commonProps} d="M48 42l-4 8" />
          </>
        )}
        {isSnow && (
          <>
            <path {...commonProps} d="M24 44v10" />
            <path {...commonProps} d="M20 48h8" />
            <path {...commonProps} d="M40 44v10" />
            <path {...commonProps} d="M36 48h8" />
          </>
        )}
        {isFog && (
          <>
            <path {...commonProps} d="M14 44h36" />
            <path {...commonProps} d="M18 50h28" />
          </>
        )}
        {isStorm && (
          <path {...commonProps} d="M30 42l-6 12h10l-4 10" />
        )}
      </g>

      <g>
        <path {...commonProps} d="M18 38c-6 0-10-4-10-10s5-12 12-12c5 0 9 3 11 7 1-1 3-2 5-2 5 0 10 4 10 10s-4 10-10 10H18z" />
        {isRain && (
          <>
            <path {...commonProps} d="M24 42l-4 8" />
            <path {...commonProps} d="M36 42l-4 8" />
            <path {...commonProps} d="M48 42l-4 8" />
          </>
        )}
        {isSnow && (
          <>
            <path {...commonProps} d="M24 44v10" />
            <path {...commonProps} d="M20 48h8" />
            <path {...commonProps} d="M40 44v10" />
            <path {...commonProps} d="M36 48h8" />
          </>
        )}
        {isFog && (
          <>
            <path {...commonProps} d="M14 44h36" />
            <path {...commonProps} d="M18 50h28" />
          </>
        )}
        {isStorm && (
          <path {...commonProps} d="M30 42l-6 12h10l-4 10" />
        )}
      </g>
    </svg>
  );
}

export default function ConditionJournalCard({
  weathercode,
  narrative,
}: {
  weathercode: number;
  narrative: string;
}) {
  const desc = describeWeatherCode(weathercode);

  return (
    <section
      className="leather-card panel-shadow stitched-border hover-lift"
      style={{
        padding: "18px",
        borderRadius: 12,
        background:
          "linear-gradient(135deg, rgba(107,58,42,0.88), rgba(58,28,18,0.92))",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="engraved-label">Weather Condition</div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-light)",
              fontSize: "1.4rem",
              textShadow: "0 2px 6px rgba(0,0,0,0.6)",
            }}
            className="mt-2"
          >
            {desc.title}
          </h3>
          <div
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(240,232,216,0.75)",
              letterSpacing: "0.06em",
            }}
            className="mt-1 text-sm"
          >
            {desc.detail}
          </div>
        </div>

        <div
          className="glass-effect"
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            color: "rgba(240,232,216,0.85)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 18px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.65))",
            }}
          >
            <EngravedWeatherIcon code={weathercode} />
          </div>
        </div>
      </div>

      <div
        className="paper-lined"
        style={{
          marginTop: 14,
          borderRadius: 10,
          padding: 14,
          border: "1px solid rgba(0,0,0,0.25)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 14px rgba(0,0,0,0.35)",
        }}
      >
        <div className="engraved-label" style={{ color: "rgba(26,15,0,0.65)" }}>
          Observatory Note
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-primary)",
            fontSize: "0.95rem",
            lineHeight: 1.5,
          }}
          className="mt-2"
        >
          {narrative}
        </p>
      </div>
    </section>
  );
}
