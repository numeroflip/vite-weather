import { format } from "date-fns";
import { DailyWeatherData } from "../../lib/services/weather.model";
import { getWeatherCodeData } from "../../lib/utils/weatherCodeData";
import clsx from "clsx";

type Props = {
  data: DailyWeatherData;
};

export default function ({ data }: Props) {
  const day = {
    date: format(new Date(data.time[0]), "EEEE MMMM do"),
    min: data.temperature_2m_min[0],
    max: data.temperature_2m_max[0],
    icon: getWeatherCodeData(data.weather_code[0]).day.image,
    description: getWeatherCodeData(data.weather_code[0]).day.description,
    rain: data.rain_sum[0],
    sunset: data.sunset[0],
    sunrise: data.sunrise[0],
  };

  const cardClass = clsx("bg-white shadow-xl rounded-xl p-4");

  return (
    <>
      <div
        className={clsx(
          cardClass,
          "grid grid-cols-2 w-full max-w-screen-md mx-auto  md:grid-cols-4  items-center gap-10"
        )}
      >
        <h3 className="text-xl col-span-full text-center mt-5 md:mt-10 md:text-2xl lg:text-3xl font-semibold">
          {day.date}
        </h3>
        <div className={clsx("flex gap-4 shrink-0  max-w-screen-xl mx-auto")}>
          <img
            src={day.icon}
            alt={day.description}
            className="size-16 md:size-32"
          />
        </div>
        <div className={clsx("flex grow flex-col items-center gap-2 ")}>
          <p className="md:text-xl font-semibold">Max: {day.max}C°</p>
          <p className="md:text-xl font-medium">Min: {day.min}C°</p>
        </div>
        <div className="flex grow flex-col gap-2 justify-center items-center">
          <div className="text-xl md:text-3xl">💧</div>
          <p className=" md:text-lg font-medium text-blue-600">
            {day.rain === 0 ? "No rain" : `${day.rain} mm`}
          </p>
        </div>
        <div className="flex grow items-center md:items-start  flex-col gap-2">
          <p className="flex gap-2 items-center font-medium">
            <span className="text-slate-600">
              {format(new Date(day.sunrise), "HH:mm")}
            </span>
            <div className="text-xl md:text-3xl">🌅</div>
          </p>
          <p className="flex gap-2 items-center font-medium ">
            <span className="text-slate-600">
              {format(new Date(day.sunset), "HH:mm")}
            </span>
            <div className="text-xl md:text-3xl">🌄</div>
          </p>
        </div>
      </div>
    </>
  );
}
