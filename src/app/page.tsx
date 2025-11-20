"use client";

import { useState, useEffect } from "react";
import SearchCity from "@/src/components/search/SearchCity";
import CurrentWeatherCard from "@/src/components/weather/CurrentWeatherCard";
import NextDaysForecast from "@/src/components/weather/NextDaysForecast";
import HighlightsGrid from "@/src/components/weather/HighlightsGrid";
import HourlyTemperatureGraph from "@/src/components/weather/HourlyTemperatureGraph";
import { CityResult, FullWeatherData } from "../types/DataType";
import { CityListSidebar } from "../components/weather";
import { fetchFullWeatherData } from "../utiles/fetchFullWeatherData";

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState<CityResult[]>([]);

  // Fetch weather whenever city changes
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

        // Save recent cities (simple unique push)
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
    <div className="flex flex-col md:flex-row min-h-screen bg-sky-50 p-6 gap-6">
      {/* Sidebar */}
      <CityListSidebar cities={recentCities} onSelectCity={setSelectedCity} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4">
        <SearchCity onSelectCity={setSelectedCity} />

        {loading && (
          <p className="text-gray-600 mt-4">Loading weather data...</p>
        )}

        {weatherData && (
          <>
            <CurrentWeatherCard
              data={weatherData.current.current_weather}
              cityName={weatherData.cityName}
            />

            <HighlightsGrid data={weatherData.current.current_weather} />

            <HourlyTemperatureGraph data={weatherData.hourly.hourly} />

            <NextDaysForecast data={weatherData.weekly.daily} />
          </>
        )}
      </main>
    </div>
  );
}
