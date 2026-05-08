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
    <div
      className="rounded-lg p-8 mt-6 w-full leather-card panel-shadow"
      style={{
        background: 'linear-gradient(135deg, rgba(61, 43, 31, 0.9), rgba(44, 31, 20, 0.95))',
      }}
    >
      <h3
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}
        className="mb-4 text-center"
      >
        HOURLY TEMPERATURE GRAPH
      </h3>

      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          border: '2px solid #8a8680',
        }}
      >
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              stroke="#8a8680"
              style={{ fontSize: '0.875rem' }}
            />
            <YAxis
              unit="°C"
              stroke="#8a8680"
              style={{ fontSize: '0.875rem' }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--lcd-bg)',
                border: '2px solid #39ff14',
                borderRadius: '4px',
                color: '#39ff14',
                fontFamily: 'var(--font-lcd)',
                boxShadow: '0 0 10px rgba(57, 255, 20, 0.4)',
              }}
              cursor={{ stroke: '#8a8680', strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#c8a84b"
              strokeWidth={3}
              isAnimationActive={true}
              animationDuration={1000}
              dot={{ fill: '#c8a84b', r: 4, strokeWidth: 2, stroke: '#8a7050' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
