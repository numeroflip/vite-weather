import { z } from "zod";

export const FetchWeatherOptionsSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  date: z.date(),
});

const HourlyDataSchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  apparent_temperature: z.array(z.number()),
  rain: z.array(z.number()),
  weather_code: z.array(z.number()),
  wind_speed_10m: z.array(z.number()),
});

const DailyDataSchema = z.object({
  time: z.array(z.string()),
  weather_code: z.array(z.number()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
  sunrise: z.array(z.string()),
  sunset: z.array(z.string()),
  rain_sum: z.array(z.number()),
});

export const WeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  hourly_units: z.object({
    time: z.string(),
    temperature_2m: z.string(),
    apparent_temperature: z.string(),
    rain: z.string(),
    weather_code: z.string(),
    wind_speed_10m: z.string(),
  }),
  hourly: HourlyDataSchema,
  daily_units: z.object({
    time: z.string(),
    weather_code: z.string(),
    temperature_2m_max: z.string(),
    temperature_2m_min: z.string(),
    sunrise: z.string(),
    sunset: z.string(),
    rain_sum: z.string(),
  }),
  daily: DailyDataSchema,
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;
export type DailyWeatherData = z.infer<typeof DailyDataSchema>;
export type HourlyWeatherData = z.infer<typeof HourlyDataSchema>;
export type FetchWeatherOptions = z.infer<typeof FetchWeatherOptionsSchema>;
