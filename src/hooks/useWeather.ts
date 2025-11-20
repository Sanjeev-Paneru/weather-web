import { useState } from "react";
import axios from "axios";
import {
  WeatherData,
  ForecastData,
  CityWeatherResponse,
  Geolocation,
} from "@/src/types/type";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch by geolocation (lat/lon)
  const fetchWeatherByGeolocation = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<CityWeatherResponse>(
        `/api/weather?lat=${lat}&lon=${lon}`
      );
      setWeatherData(response.data.current);
      setForecastData(response.data.forecast);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Could not fetch weather data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch by city name (geocoding -> lat/lon)
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      // Geocode city using Open Meteo
      const geoRes = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: { name: city, count: 1, language: "en", format: "json" },
        }
      );

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geoRes.data.results[0] as Geolocation;
      await fetchWeatherByGeolocation(latitude, longitude);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Could not fetch weather data. Please try again."
      );
      setLoading(false);
    }
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
    fetchWeatherByGeolocation,
  };
};

export default useWeather;
