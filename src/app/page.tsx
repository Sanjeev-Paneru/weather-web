"use client";

import { useState, useEffect } from "react";
import SearchCity from "@/src/components/search/SearchCity";
import CurrentWeatherCard from "@/src/components/weather/CurrentWeatherCard";
import NextDaysForecast from "@/src/components/weather/NextDaysForecast";
import HighlightsGrid from "@/src/components/weather/HighlightsGrid";
import HourlyTemperatureGraph from "@/src/components/weather/HourlyTemperatureGraph";
import HourlyInstrumentStrip from "@/src/components/weather/HourlyInstrumentStrip";
import ScientificInstrumentsPanel from "@/src/components/weather/ScientificInstrumentsPanel";
import { CityResult, FullWeatherData } from "../types/DataType";
import { CityListSidebar } from "../components/weather";
import { fetchFullWeatherData } from "../utiles/fetchFullWeatherData";

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState<CityResult[]>([]);

  useEffect(() => {
    if (!selectedCity) return;

    const loadWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchFullWeatherData(
          selectedCity.latitude,
          selectedCity.longitude
        );
        setWeatherData({ ...data, cityName: selectedCity.name });

        setRecentCities((prev) => {
          const exists = prev.find((c) => c.id === selectedCity.id);
          if (exists) return prev;
          return [selectedCity, ...prev].slice(0, 5);
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [selectedCity]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-6 gap-6 w-full max-w-7xl mx-auto">
      <CityListSidebar cities={recentCities} onSelectCity={setSelectedCity} />

      <main className="flex-1 flex flex-col gap-4">
        <div className="console-shell">
          <div style={{ padding: 16 }}>
            <SearchCity onSelectCity={setSelectedCity} />

            {loading && (
              <p
                style={{ fontFamily: "var(--font-body)", color: "rgba(240,232,216,0.8)" }}
                className="mt-4 text-center"
              >
                Loading atmospheric data…
              </p>
            )}

            {weatherData && (
              <div className="flex flex-col gap-6 mt-4">
                <CurrentWeatherCard
                  data={weatherData.current.current_weather}
                  cityName={weatherData.cityName}
                  hourly={weatherData.hourly.hourly}
                  daily={weatherData.weekly.daily}
                />

                <HourlyInstrumentStrip
                  nowISO={weatherData.current.current_weather.time}
                  data={weatherData.hourly.hourly}
                />

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                  <div className="xl:col-span-7 flex flex-col gap-6">
                    <HighlightsGrid data={weatherData.current.current_weather} />
                    <HourlyTemperatureGraph data={weatherData.hourly.hourly} />
                  </div>
                  <div className="xl:col-span-5">
                    <ScientificInstrumentsPanel
                      current={weatherData.current.current_weather}
                      hourly={weatherData.hourly.hourly}
                      daily={weatherData.weekly.daily}
                    />
                  </div>
                </div>

                <NextDaysForecast data={weatherData.weekly.daily} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
