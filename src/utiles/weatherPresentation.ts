import { DailyForecast, HourlyForecast } from "@/src/types/DataType";

export type WeatherCodeDescriptor = {
  title: string;
  detail: string;
};

// Open-Meteo weather codes (subset)
export function describeWeatherCode(code: number): WeatherCodeDescriptor {
  const map: Record<number, WeatherCodeDescriptor> = {
    0: { title: "Clear", detail: "Clear sky" },
    1: { title: "Mostly Clear", detail: "Mainly clear" },
    2: { title: "Partly Cloudy", detail: "Partly cloudy" },
    3: { title: "Overcast", detail: "Overcast" },
    45: { title: "Fog", detail: "Fog" },
    48: { title: "Fog", detail: "Depositing rime fog" },
    51: { title: "Drizzle", detail: "Light drizzle" },
    53: { title: "Drizzle", detail: "Moderate drizzle" },
    55: { title: "Drizzle", detail: "Dense drizzle" },
    61: { title: "Rain", detail: "Slight rain" },
    63: { title: "Rain", detail: "Moderate rain" },
    65: { title: "Rain", detail: "Heavy rain" },
    71: { title: "Snow", detail: "Slight snow" },
    73: { title: "Snow", detail: "Moderate snow" },
    75: { title: "Snow", detail: "Heavy snow" },
    80: { title: "Showers", detail: "Slight rain showers" },
    81: { title: "Showers", detail: "Moderate rain showers" },
    82: { title: "Showers", detail: "Violent rain showers" },
    95: { title: "Storm", detail: "Thunderstorm" },
    96: { title: "Storm", detail: "Thunderstorm with hail" },
    99: { title: "Storm", detail: "Thunderstorm with hail" },
  };

  return map[code] ?? { title: "Conditions", detail: `Weather code ${code}` };
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatClock(ts: string) {
  const d = new Date(ts);
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export function findNearestHourlyIndex(hourly: HourlyForecast, nowISO: string) {
  const now = new Date(nowISO).getTime();
  let bestIdx = 0;
  let bestDelta = Number.POSITIVE_INFINITY;
  for (let i = 0; i < hourly.time.length; i++) {
    const t = new Date(hourly.time[i]).getTime();
    const delta = Math.abs(t - now);
    if (delta < bestDelta) {
      bestDelta = delta;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function buildNarrative(opts: {
  nowISO: string;
  hourly?: HourlyForecast;
  daily?: DailyForecast;
}) {
  const { nowISO, hourly, daily } = opts;
  const now = new Date(nowISO);

  const lines: string[] = [];

  // Precipitation timing narrative (from existing hourly precipitation mm)
  if (hourly) {
    const startIdx = findNearestHourlyIndex(hourly, nowISO);
    const lookAhead = Math.min(hourly.time.length, startIdx + 8);
    const threshold = 0.2;

    let firstEventIdx: number | null = null;
    for (let i = startIdx; i < lookAhead; i++) {
      if ((hourly.precipitation?.[i] ?? 0) >= threshold) {
        firstEventIdx = i;
        break;
      }
    }

    if (firstEventIdx != null) {
      const eventTime = new Date(hourly.time[firstEventIdx]);
      const minutes = Math.max(0, Math.round((eventTime.getTime() - now.getTime()) / 60000));
      if (minutes <= 120) {
        lines.push(`Precipitation likely in about ${minutes} minutes.`);
      } else {
        const hrs = Math.round(minutes / 60);
        lines.push(`Precipitation likely later today (≈ ${hrs} hours).`);
      }
    } else {
      lines.push("Stable conditions for the next few hours.");
    }

    const visM = hourly.visibility?.[startIdx];
    if (typeof visM === "number") {
      const visKm = Math.round(visM / 100) / 10;
      if (visKm < 5) lines.push("Reduced visibility—take care outdoors.");
      else if (visKm > 10) lines.push("Visibility is strong for travel and outdoor plans.");
    }
  }

  // UV narrative (daily max)
  if (daily?.uv_index_max?.length) {
    const uv = daily.uv_index_max[0];
    if (uv >= 8) lines.push("High UV today—shade and sunscreen recommended.");
    else if (uv >= 6) lines.push("Moderate-to-high UV this afternoon.");
  }

  // Sunset reference (for planning)
  if (daily?.sunset?.length) {
    const sunset = new Date(daily.sunset[0]);
    if (!Number.isNaN(sunset.getTime()) && sunset.getTime() > now.getTime()) {
      lines.push(`Sunset at ${formatClock(daily.sunset[0])}.`);
    }
  }

  return lines.slice(0, 3).join(" ");
}
