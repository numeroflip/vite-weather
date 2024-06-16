import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./lib/services/weather";
import { useCallback, useState } from "react";
import { FetchWeatherOptions } from "./lib/services/weather.model";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherForm, { WeatherFormValues } from "./components/Form";
import Layout from "./components/Layout";

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

  const { data, isLoading } = useQuery({
    queryKey: [
      "weather",
      submittedValues ? JSON.stringify(submittedValues) : "",
    ],
    queryFn: fetcher,
  });

  const onSubmit = useCallback((data: WeatherFormValues) => {
    console.info("data", data);
    setSubmittedValues({
      lat: data.lat,
      lon: data.lon,
      date: new Date(data.date),
    });
  }, []);

  return (
    <Layout
      header={<Header />}
      main={
        <>
          <div className="mt-10">
            <WeatherForm onSubmit={onSubmit} />
          </div>

          {isLoading && <p>Loading...</p>}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      }
      footer={<Footer />}
    />
  );
}

export default App;
