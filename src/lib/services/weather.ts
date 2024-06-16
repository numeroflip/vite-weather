import { addDays, subDays } from "date-fns";
import { toDateString } from "../utils/date";
import {
  FetchWeatherOptions,
  WeatherResponse,
  WeatherResponseSchema,
} from "./weather.model";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const HOURLY_DATA_TYPES = [
  "temperature_2m",
  "apparent_temperature",
  "rain",
  "weather_code",
  "wind_speed_10m",
];

const DAILY_DATA_TYPES = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
  "rain_sum",
];

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function buildWeatherUrl({ lat, lon, date }: FetchWeatherOptions) {
  return `${BASE_URL}?latitude=${lat}&longitude=${lon}&timezone=${timezone}&hourly=${HOURLY_DATA_TYPES.join(
    ","
  )}&daily=${DAILY_DATA_TYPES.join(",")}&start_date=${toDateString(
    date
  )}&end_date=${toDateString(date)}`;
}

export async function fetchWeather(
  options: FetchWeatherOptions
): Promise<WeatherResponse | null> {
  const response = await fetch(buildWeatherUrl(options));
  if (response.ok) {
    const data = await response.json();
    const validated = WeatherResponseSchema.safeParse(data);
    if (!validated.success) {
      console.error(validated.error.format());
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
const MAX_PREVIOUS_DAYS = 30;
export function getMaxAllowedDate() {
  return toDateString(addDays(new Date(), MAX_FUTURE_DAYS));
}

export function getMinAllowedDate() {
  return toDateString(subDays(new Date(), MAX_PREVIOUS_DAYS));
}

export function fetchWeatherForDay() {}
