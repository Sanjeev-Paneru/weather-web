export interface CityResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeoSearchResponse {
  results?: CityResult[];
}
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface CurrentWeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: CurrentWeather;
}
export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  wind_speed_10m: number[];
  visibility: number[];
}

export interface HourlyForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: HourlyForecast;
}
export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  uv_index_max: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeeklyForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: DailyForecast;
}

export interface FullWeatherData {
  current: CurrentWeatherResponse;
  weekly: WeeklyForecastResponse;
  hourly: HourlyForecastResponse;
  cityName: string;
}
