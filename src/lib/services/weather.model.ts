import { z } from "zod";

export const FetchWeatherOptionsSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  date: z.date(),
});

const HourlyUnitsSchema = z.object({
  time: z.literal("iso8601"),
  temperature_2m: z.literal("°C"),
  apparent_temperature: z.literal("°C"),
  rain: z.literal("mm"),
  weather_code: z.literal("wmo code"),
  wind_speed_10m: z.literal("km/h"),
});

const HourlySchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  apparent_temperature: z.array(z.number()),
  rain: z.array(z.number()),
  weather_code: z.array(z.number()),
  wind_speed_10m: z.array(z.number()),
});

export const WeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  hourly_units: HourlyUnitsSchema,
  hourly: HourlySchema,
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

export type FetchWeatherOptions = z.infer<typeof FetchWeatherOptionsSchema>;
