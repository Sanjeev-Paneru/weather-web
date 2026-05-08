"use client";

import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Moon } from "lucide-react";

type HeaderCurrentWeather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
};

type ReverseGeocodeResult = {
  name?: string;
  country?: string;
  admin1?: string;
};

type ReverseGeocodeResponse = {
  results?: ReverseGeocodeResult[];
};

const fetchCurrentWeather = async (
  lat: number,
  lon: number
): Promise<HeaderCurrentWeather | null> => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { current_weather?: HeaderCurrentWeather };
    return data.current_weather ?? null;
  } catch {
    return null;
  }
};

const fetchCityName = async (lat: number, lon: number): Promise<string> => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=en&format=json`,
      { cache: "no-store" }
    );

    if (!res.ok) return "Your Location";

    const data = (await res.json()) as ReverseGeocodeResponse;
    const first = data.results?.[0];

    if (!first?.name) return "Your Location";
    if (first.country) return `${first.name}, ${first.country}`;
    return first.name;
  } catch {
    // In the browser this can fail due to network/CORS; don't crash the UI.
    return "Your Location";
  }
};

export default function Header() {
  const [currentWeather, setCurrentWeather] = useState<HeaderCurrentWeather | null>(null);
  const [placeName, setPlaceName] = useState<string>("Your Location");

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const [weather, name] = await Promise.all([
            fetchCurrentWeather(latitude, longitude),
            fetchCityName(latitude, longitude),
          ]);

          setCurrentWeather(weather);
          setPlaceName(name);
        } catch (err) {
          console.error(err);
        }
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
    <header
      className="relative overflow-hidden pb-12"
      style={{
        background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-primary))',
      }}
    >
      {/* Leather strip with rivets */}
      <div
        className="absolute top-0 inset-x-0 h-6"
        style={{
          background: 'linear-gradient(180deg, #5a3a2a, #4a2a1a)',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        {/* Rivets */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ffd700, #b8860b)',
              left: `${(i / 11) * 100}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              boxShadow: 'inset -0.5px -0.5px 1px rgba(0,0,0,0.8)',
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 pt-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sun size={48} className="text-yellow-400 opacity-80" />
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(200,168,75,0.3)',
              }}
              className="font-bold"
            >
              WEATHER STATION
            </h1>
            <Cloud size={48} className="text-gray-300 opacity-60" />
          </div>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-light)' }} className="text-lg md:text-xl font-medium">
            Analog Weather Instrument Dashboard
          </p>
        </div>



        {/* Current Location Quick Weather Cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {weatherCards.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg p-4 text-center transition-all cursor-pointer hover:translate-y-1"
              style={{
                background: 'rgba(107, 58, 42, 0.3)',
                border: '2px solid rgba(200, 168, 75, 0.3)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 6px rgba(0,0,0,0.6)',
              }}
            >
              <item.icon className="mx-auto mb-2 text-gray-300" size={28} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem' }} className="text-gray-300">
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-lcd)',
                  color: 'var(--lcd-green)',
                  textShadow: '0 0 6px rgba(57,255,20,0.4)',
                }}
                className="text-lg font-bold"
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);} }
        @keyframes float-delayed { 0%,100%{transform:translateY(0);}50%{transform:translateY(-15px);} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </header>
  );
}
