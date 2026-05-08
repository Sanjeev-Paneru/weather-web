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
      className="rounded-lg p-6 w-full md:w-64 overflow-auto max-h-[80vh] stitched-border leather-card panel-shadow"
      style={{
        background: 'linear-gradient(135deg, rgba(107, 58, 42, 0.8), rgba(75, 40, 25, 0.9))',
      }}
    >
      <h3
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}
        className="mb-4 text-center"
      >
        Recent Cities
      </h3>

      <ul className="space-y-2">
        {cities.map((city) => (
          <li
            key={city.id}
            onClick={() => onSelectCity(city)}
            className="px-4 py-2 rounded cursor-pointer transition-all hover:translate-x-1 active:translate-x-0"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-light)',
              background: 'rgba(200, 168, 75, 0.15)',
              border: '1px solid rgba(200, 168, 75, 0.3)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            <span className="text-sm inline-flex items-center gap-2">
              <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden="true">
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
            </span>
            <p className="text-xs text-gray-300 mt-0.5">{city.country}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
