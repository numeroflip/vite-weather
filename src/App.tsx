import { useQuery } from "@tanstack/react-query";
import {
  fetchWeather,
  getMaxAllowedDate,
  getMinAllowedDate,
} from "./lib/services/weather";
import { useCallback, useState } from "react";
import { FetchWeatherOptions } from "./lib/services/weather.model";
import { useForm } from "react-hook-form";
import { toDateString } from "./lib/utils/date";

const DEFAULT_FORM_VALUES: FormValues = {
  lat: 47.497913,
  lon: 19.040236,
  date: toDateString(new Date()),
};

type FormValues = {
  lat: number;
  lon: number;
  date: string;
};

function App() {
  const [submittedValues, setSubmittedValues] =
    useState<FetchWeatherOptions | null>(null);

  const fetcher = useCallback(
    async () =>
      submittedValues
        ? await fetchWeather(submittedValues)
        : Promise.resolve(null),
    [submittedValues]
  );

  const { register, handleSubmit } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "weather",
      submittedValues ? JSON.stringify(submittedValues) : "",
    ],
    queryFn: fetcher,
  });

  const onSubmit = (data: FormValues) => {
    console.info("data", data);
    setSubmittedValues({
      lat: data.lat,
      lon: data.lon,
      date: new Date(data.date),
    });
  };

  return (
    <>
      <header>Header</header>
      <h1>App</h1>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="lat">Latitude</label>
          <input required {...register("lat")} type="number" step="0.000001" />
          <label htmlFor="lon">Longitude</label>
          <input required {...register("lon")} type="number" step="0.000001" />
          <label htmlFor="date">Date</label>
          <input
            required
            type="date"
            {...register("date")}
            min={getMinAllowedDate()}
            max={getMaxAllowedDate()}
          />

          <button type="submit">Submit</button>
        </form>
        {isLoading && <p>Loading...</p>}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
