import { DailyForecast } from "@/src/types/DataType";

interface NextDaysForecastProps {
  data: DailyForecast;
}

export default function NextDaysForecast({ data }: NextDaysForecastProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 w-full mt-4 overflow-x-auto">
      <h3 className="text-xl font-semibold mb-2">Next Days Forecast</h3>
      <div className="flex gap-4">
        {data.time.map((date, idx) => (
          <div
            key={date}
            className="flex flex-col items-center bg-blue-50 p-3 rounded-xl min-w-20"
          >
            <p className="text-sm">
              {new Date(date).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            <p className="text-lg font-bold">
              {data.temperature_2m_max[idx]}° / {data.temperature_2m_min[idx]}°
            </p>
            <p className="text-sm">Precip: {data.precipitation_sum[idx]} mm</p>
            <p className="text-sm">UV: {data.uv_index_max[idx]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
