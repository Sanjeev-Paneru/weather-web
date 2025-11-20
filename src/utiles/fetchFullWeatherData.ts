import {
  fetchCurrentWeather,
  fetchHourlyForecast,
  fetchWeeklyForecast,
} from "../services/weatherService";
import {
  FullWeatherData,
  CurrentWeatherResponse,
  HourlyForecastResponse,
  WeeklyForecastResponse,
} from "../types/DataType";

export const fetchFullWeatherData = async (
  lat: number,
  lon: number
): Promise<Omit<FullWeatherData, "cityName">> => {
  const [current, hourly, weekly] = await Promise.all([
    fetchCurrentWeather(lat, lon) as Promise<CurrentWeatherResponse>,
    fetchHourlyForecast(lat, lon) as Promise<HourlyForecastResponse>,
    fetchWeeklyForecast(lat, lon) as Promise<WeeklyForecastResponse>,
  ]);

  return {
    current,
    hourly,
    weekly,
  };
};
