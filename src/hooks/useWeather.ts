import { useState } from "react";
import axios from "axios";
import { CityResult } from "@/src/types/DataType";

const useWeather = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string): Promise<CityResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const geoRes = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: { name: city, count: 1, language: "en", format: "json" },
        }
      );

      if (!geoRes.data?.results || geoRes.data.results.length === 0) {
        setError("City not found");
        return null;
      }

      return geoRes.data.results[0] as CityResult;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = (err.response?.data as { error?: string } | undefined)?.error;
        setError(msg || "Could not fetch weather data. Please try again.");
      } else {
        setError("Could not fetch weather data. Please try again.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchWeather,
  };
};

export default useWeather;

