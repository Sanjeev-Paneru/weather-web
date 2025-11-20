import { CityResult } from "@/src/types/DataType";

interface CityListSidebarProps {
  cities: CityResult[];
  onSelectCity: (city: CityResult) => void;
}

export default function CityListSidebar({
  cities,
  onSelectCity,
}: CityListSidebarProps) {
  // Render nothing if there are no cities
  if (!cities || cities.length === 0) return null;

  return (
    <aside className="bg-white shadow rounded-xl p-4 w-64 overflow-auto max-h-[80vh]">
      <h3 className="text-xl font-semibold mb-2">Cities</h3>
      <ul>
        {cities.map((city) => (
          <li
            key={city.id}
            onClick={() => onSelectCity(city)}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded mb-1"
          >
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </aside>
  );
}
