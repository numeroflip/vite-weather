import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HourlyWeatherData } from "../../lib/services/weather.model";
import { format } from "date-fns";

type Props = {
  data: HourlyWeatherData;
};

const HOURLY_RAIN_TOP_TRESHOLD = 2;

export default function TemperatureChart({ data: hourly }: Props) {
  const { time, temperature_2m, rain } = hourly;

  const dataArray = time.map((_, index) => ({
    time: format(new Date(time[index]), "HH:mm"),
    temperature: temperature_2m[index],
    rain: rain[index],
  }));

  const gradientOffset = () => {
    const dataMax = Math.max(...dataArray.map((i) => i.temperature));
    const dataMin = Math.min(...dataArray.map((i) => i.temperature));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();
  const maxRain = Math.max(...dataArray.map((i) => i.rain));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        barCategoryGap={0}
        barSize={"10"}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
        data={dataArray}
      >
        <XAxis
          tick={{ fontSize: 12, color: "gray" }}
          axisLine={true}
          tickLine={false}
          interval="equidistantPreserveStart"
          dataKey="time"
        ></XAxis>
        <YAxis
          mirror
          tick={{ fontSize: 12, color: "black", z: 100 }}
          orientation="left"
          yAxisId="temperature"
          padding={{ top: 0, bottom: 0 }}
          tickFormatter={(temp) => `${temp}C°`}
        />
        <YAxis
          mirror
          tick={{ fontSize: 12, color: "black", z: 100 }}
          orientation="right"
          domain={[
            "0",
            HOURLY_RAIN_TOP_TRESHOLD > maxRain
              ? HOURLY_RAIN_TOP_TRESHOLD
              : "dataMax + 2",
          ]}
          yAxisId="rain"
          tickFormatter={(rain) => `${rain}mm`}
        />
        <CartesianGrid strokeDasharray="4 4" strokeWidth={1} />
        <Tooltip
          labelFormatter={(time) => {
            return time;
          }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const temperatureData = payload[0].value;
              const rainData = payload[1].value;
              const hasRain = !!Number(rainData);

              return (
                <div className="bg-white/80 py-2 px-4 rounded-md shadow-md">
                  <p className="text-slate-400 text-center">{label}</p>
                  <p className="text-slate-600 font-semibold text-center">
                    {temperatureData}°C
                  </p>
                  {hasRain && (
                    <p className="text-blue-600 text-center">{rainData} mm</p>
                  )}
                </div>
              );
            }
          }}
          labelClassName="text-slate-600 text-center"
          animationDuration={300}
          wrapperClassName="rounded-md bg-white/10 p-1 m-1"
        />

        <Area
          type="monotone"
          dataKey="temperature"
          strokeWidth={2}
          yAxisId="temperature"
          stroke={"#d8a583c4"}
          fill="url(#splitColor)"
        />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#ecf014ba" stopOpacity={1} />
            <stop offset={off} stopColor="#42A5F5" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Bar
          type="linear"
          overflow={"hidden"}
          dataKey="rain"
          strokeWidth={2}
          yAxisId="rain"
          stroke={"#42A5F5"}
          fill="#42A5F5"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
