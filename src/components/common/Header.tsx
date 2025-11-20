"use client";

import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Moon } from "lucide-react";

// Fetch current weather
const fetchCurrentWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
  );
  const data = await res.json();
  return data.current_weather;
};

// Reverse geocode to get city/place name
const fetchCityName = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`
  );
  const data = await res.json();
  return data.name || "Unknown Location";
};

// --- Header Component ---
export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchResults, setSearchResults] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [placeName, setPlaceName] = useState<string>("Your Location");

  // Get current location weather + name
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weather = await fetchCurrentWeather(latitude, longitude);
        setCurrentWeather(weather);

        const name = await fetchCityName(latitude, longitude);
        setPlaceName(name);
      },
      (err) => console.error(err)
    );
  }, []);

  const weatherCards = currentWeather
    ? [
        {
          icon: Sun,
          label: `Temperature (${placeName})`,
          value: `${currentWeather.temperature}°C`,
        },
        {
          icon: Cloud,
          label: "Wind Speed",
          value: `${currentWeather.windspeed} km/h`,
        },
        {
          icon: CloudRain,
          label: "Wind Dir",
          value: `${currentWeather.winddirection}°`,
        },
        {
          icon: Moon,
          label: "Weather Code",
          value: currentWeather.weathercode,
        },
      ]
    : [
        { icon: Sun, label: "Temp", value: "--°C" },
        { icon: Cloud, label: "Wind", value: "-- km/h" },
        { icon: CloudRain, label: "Dir", value: "--°" },
        { icon: Moon, label: "Code", value: "--" },
      ];

  return (
    <header className="relative overflow-hidden bg-linear-to-b from-blue-400 via-blue-500 to-blue-600 pb-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sun
          size={80}
          className="absolute top-10 left-10 text-yellow-200 opacity-20 animate-float"
        />
        <Cloud
          size={100}
          className="absolute top-20 right-20 text-white opacity-15 animate-float-delayed"
        />
        <CloudRain
          size={60}
          className="absolute bottom-10 left-1/4 text-blue-200 opacity-10 animate-float"
        />
        <Moon
          size={70}
          className="absolute top-1/2 right-1/3 text-gray-100 opacity-10 animate-float-delayed"
        />
      </div>

      <div className="relative container mx-auto px-4 pt-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sun size={48} className="text-yellow-300 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              WeatherNow
            </h1>
            <Cloud size={48} className="text-white/80" />
          </div>
          <p className="text-white/90 text-lg md:text-xl font-medium drop-shadow">
            Your Accurate Weather Forecast Companion
          </p>
        </div>

        {searchResults && (
          <div className="mt-6 text-center text-white/90 font-medium">
            {searchResults}
          </div>
        )}

        {/* Current Location Quick Weather Cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {weatherCards.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-white/30 transition-all cursor-pointer hover:scale-105"
            >
              <item.icon className="mx-auto mb-2 text-white" size={32} />
              <p className="text-white font-semibold text-sm">{item.label}</p>
              <p className="text-white text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);} }
        @keyframes float-delayed { 0%,100%{transform:translateY(0);}50%{transform:translateY(-15px);} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </header>
  );
}
