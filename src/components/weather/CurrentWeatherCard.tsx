import { CurrentWeather } from "@/src/types/DataType";

interface CurrentWeatherCardProps {
  data: CurrentWeather;
  cityName: string;
}

export default function CurrentWeatherCard({
  data,
  cityName,
}: CurrentWeatherCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-6 w-full">
      <h2 className="text-2xl font-semibold mb-2">{cityName}</h2>
      <p className="text-lg text-gray-600">{data.time}</p>
      <div className="flex items-center mt-4">
        <div className="text-4xl font-bold">{data.temperature}°C</div>
        <div className="ml-6">
          <p>Wind: {data.windspeed} km/h</p>
          <p>Direction: {data.winddirection}°</p>
          <p>{data.is_day ? "Day" : "Night"}</p>
        </div>
      </div>
    </div>
  );
}
