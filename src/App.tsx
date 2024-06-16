import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./lib/services/weather";
import { useCallback, useState } from "react";
import { FetchWeatherOptions } from "./lib/services/weather.model";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherForm, { WeatherFormValues } from "./components/Form";
import Layout from "./components/Layout";

import DailyWeatherData from "./components/DailyWeatherData";
import TemperatureChart from "./components/HourlyWeatherData/TemperatureCharts";

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

  const { data } = useQuery({
    queryKey: [
      "weather",
      submittedValues ? JSON.stringify(submittedValues) : "",
    ],
    queryFn: fetcher,
  });

  const onSubmit = useCallback((data: WeatherFormValues) => {
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
          <h1 className="sr-only">Check your weather</h1>
          <section className="mt-10 px-5 w-full mb-10">
            <WeatherForm onSubmit={onSubmit} />
          </section>
          {data && (
            <>
              <section className="w-full px-5 mb-10">
                <DailyWeatherData data={data.daily} />
              </section>

              <section className="w-full mb-10">
                <div className="mx-auto pt-8 pb-3 max-w-screen-xl md:px-5 bg-white w-full aspect-video md:aspect-[6/2]  shadow-xl lg:rounded-xl ">
                  <TemperatureChart data={data.hourly} />
                </div>
              </section>
            </>
          )}
        </>
      }
      footer={<Footer />}
    />
  );
}

export default App;
