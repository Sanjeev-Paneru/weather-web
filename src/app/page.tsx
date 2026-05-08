"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchCity from "@/src/components/search/SearchCity";
import CurrentWeatherCard from "@/src/components/weather/CurrentWeatherCard";
import NextDaysForecast from "@/src/components/weather/NextDaysForecast";
import HighlightsGrid from "@/src/components/weather/HighlightsGrid";
import HourlyTemperatureGraph from "@/src/components/weather/HourlyTemperatureGraph";
import HourlyInstrumentStrip from "@/src/components/weather/HourlyInstrumentStrip";
import ScientificInstrumentsPanel from "@/src/components/weather/ScientificInstrumentsPanel";
import RecentCitiesModal from "@/src/components/weather/RecentCitiesModal";
import { CityResult, FullWeatherData } from "../types/DataType";
import { fetchFullWeatherData } from "../utiles/fetchFullWeatherData";

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState<CityResult[]>([]);

  const [recentMounted, setRecentMounted] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false);
  const recentCloseTimerRef = useRef<number | null>(null);

  const openRecent = () => {
    if (recentCloseTimerRef.current) {
      window.clearTimeout(recentCloseTimerRef.current);
      recentCloseTimerRef.current = null;
    }
    setRecentOpen(true);
    setRecentMounted(true);
  };

  const closeRecent = () => {
    setRecentOpen(false);
    if (recentCloseTimerRef.current) window.clearTimeout(recentCloseTimerRef.current);
    recentCloseTimerRef.current = window.setTimeout(() => {
      setRecentMounted(false);
      recentCloseTimerRef.current = null;
    }, 220);
  };

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
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {recentMounted && (
        <RecentCitiesModal
          open={recentOpen}
          onClose={closeRecent}
          cities={recentCities}
          onSelectCity={setSelectedCity}
        />
      )}

      <main className="w-full">
        <div className="console-shell">
          <div style={{ padding: 16 }}>
            {/* Top controls (responsive) */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex-1">
                <SearchCity onSelectCity={setSelectedCity} />
              </div>

              <button
                type="button"
                className="pressable"
                onClick={openRecent}
                style={{
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.06em",
                  color: "rgba(26,15,0,0.9)",
                  background: "linear-gradient(145deg,#c0b090,#8a7060)",
                  border: "1px solid rgba(0,0,0,0.35)",
                  minWidth: 170,
                }}
              >
                Recent Cities
                <span
                  className="ml-2"
                  style={{
                    fontFamily: "var(--font-lcd)",
                    color: "rgba(26,15,0,0.7)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {recentCities.length}
                </span>
              </button>
            </div>

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
