import { HourlyForecast } from "@/src/types/DataType";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HourlyTemperatureGraphProps {
  data: HourlyForecast;
}

export default function HourlyTemperatureGraph({
  data,
}: HourlyTemperatureGraphProps) {
  const chartData = data.time.map((t, idx) => ({
    time: new Date(t).getHours() + ":00",
    temp: data.temperature_2m[idx],
  }));

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4 w-full">
      <h3 className="text-xl font-semibold mb-2">Hourly Temperature</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#0284c7"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
