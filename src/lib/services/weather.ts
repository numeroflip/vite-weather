import { addDays } from "date-fns";
import { toDateString } from "../utils/date";
import {
  FetchWeatherOptions,
  WeatherResponse,
  WeatherResponseSchema,
} from "./weather.model";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const DATA_TYPES = [
  "temperature_2m",
  "apparent_temperature",
  "rain",
  "weather_code",
  "wind_speed_10m",
];

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function buildWeatherUrl({ lat, lon, date }: FetchWeatherOptions) {
  return `${BASE_URL}?latitude=${lat}&longitude=${lon}&timezone=${timezone}&hourly=${DATA_TYPES.join(
    ","
  )}&start_date=${toDateString(date)}&end_date=${toDateString(date)}`;
}

export async function fetchWeather(
  options: FetchWeatherOptions
): Promise<WeatherResponse | null> {
  const response = await fetch(buildWeatherUrl(options));
  if (response.ok) {
    const data = await response.json();
    const validated = WeatherResponseSchema.safeParse(data);
    if (!validated.success) {
      console.error(validated.error);
      return null;
    }
    return validated.data;
  }
  console.error(
    `Failed to fetch: ${response.status}: ${response?.statusText || ""}`
  );
  return null;
}

const MAX_FUTURE_DAYS = 14;
export function getMaxAllowedDate() {
  return toDateString(addDays(new Date(), MAX_FUTURE_DAYS));
}

export function getMinAllowedDate() {
  return toDateString(new Date("2020-01-01"));
}

export function fetchWeatherForDay() {}
