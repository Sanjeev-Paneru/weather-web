import { CurrentWeather } from "@/src/types/DataType";

interface HighlightsGridProps {
  data: CurrentWeather;
}

export default function HighlightsGrid({ data }: HighlightsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="font-semibold">Wind Speed</p>
        <p>{data.windspeed} km/h</p>
      </div>
      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="font-semibold">Wind Direction</p>
        <p>{data.winddirection}°</p>
      </div>
      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="font-semibold">Temperature</p>
        <p>{data.temperature}°C</p>
      </div>
      <div className="bg-white shadow rounded-xl p-4 text-center">
        <p className="font-semibold">Day/Night</p>
        <p>{data.is_day ? "Day" : "Night"}</p>
      </div>
    </div>
  );
}
