import { CurrentWeather } from "@/src/types/DataType";
import GaugeDial from "./GaugeDial";
import LCDPanel from "./LCDPanel";

interface HighlightsGridProps {
  data: CurrentWeather;
}

export default function HighlightsGrid({ data }: HighlightsGridProps) {
  return (
    <div className="w-full leather-card panel-shadow p-8 mt-6">
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }} className="mb-6 text-center">
        INSTRUMENT PANEL
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Wind Speed Gauge */}
        <div className="flex justify-center">
          <GaugeDial
            value={data.windspeed}
            max={100}
            label="Wind Speed"
            unit="km/h"
            color="var(--lcd-green)"
          />
        </div>

        {/* Wind Direction Gauge */}
        <div className="flex justify-center">
          <GaugeDial
            value={data.winddirection % 360}
            max={360}
            label="Wind Direction"
            unit="°"
            color="#87ceeb"
          />
        </div>

        {/* Temperature LCD */}
        <div>
          <LCDPanel
            label="Temperature"
            value={Math.round(data.temperature)}
            unit="°C"
            color="var(--lcd-green)"
          />
        </div>

        {/* Day/Night Status LCD */}
        <div>
          <LCDPanel
            label="Status"
            value={data.is_day ? 'DAY' : 'NIGHT'}
            color={data.is_day ? '#ffd700' : '#87ceeb'}
          />
        </div>
      </div>
    </div>
  );
}
