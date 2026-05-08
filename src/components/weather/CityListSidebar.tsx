import { CityResult } from "@/src/types/DataType";

interface CityListSidebarProps {
  cities: CityResult[];
  onSelectCity: (city: CityResult) => void;
}

export default function CityListSidebar({
  cities,
  onSelectCity,
}: CityListSidebarProps) {
  if (!cities || cities.length === 0) return null;

  return (
    <aside
      className="rounded-lg p-7 w-full md:w-80 overflow-auto max-h-[85vh] stitched-border leather-card panel-shadow"
      style={{
        background:
          "linear-gradient(135deg, rgba(107, 58, 42, 0.86), rgba(75, 40, 25, 0.92))",
      }}
    >
      <div className="text-center">
        <div className="engraved-label">Recent Searches</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            color: "var(--text-light)",
            textShadow: "0 2px 6px rgba(0,0,0,0.6)",
          }}
          className="mt-2"
        >
          Cities
        </h3>
      </div>

      <div className="metal-divider" style={{ marginTop: 14, marginBottom: 16 }} />

      <ul className="space-y-3">
        {cities.map((city) => (
          <li
            key={city.id}
            onClick={() => onSelectCity(city)}
            className="pressable px-5 py-4 rounded cursor-pointer transition-all hover:translate-x-1 active:translate-x-0"
            style={{
              color: "var(--text-light)",
              background: "rgba(200, 168, 75, 0.16)",
              border: "1px solid rgba(200, 168, 75, 0.35)",
              boxShadow:
                "inset 0 1px 3px rgba(0,0,0,0.35), 0 8px 18px rgba(0,0,0,0.35)",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div
                  className="inline-flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  {city.name}
                </div>

                <div
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "rgba(240,232,216,0.72)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {city.country}
                </div>
              </div>

              <div
                className="lcd-recess"
                style={{
                  padding: "10px 12px",
                  minWidth: 86,
                  textAlign: "right",
                }}
              >
                <div className="engraved-label" style={{ color: "rgba(240,232,216,0.55)" }}>
                  Tap
                </div>
                <div className="lcd-glow-green" style={{ fontSize: "1rem" }}>
                  LOAD
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
