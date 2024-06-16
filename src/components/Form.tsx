import { useForm } from "react-hook-form";
import { getMaxAllowedDate, getMinAllowedDate } from "../lib/services/weather";
import { toDateString } from "../lib/utils/date";
import clsx from "clsx";

type Props = {
  onSubmit: (data: WeatherFormValues) => void;
};

export type WeatherFormValues = {
  lat: number;
  lon: number;
  date: string;
};

const DEFAULT_FORM_VALUES: WeatherFormValues = {
  lat: 47.497913,
  lon: 19.040236,
  date: toDateString(new Date()),
};

const classes = {
  label: clsx("text-xs text-center text-slate-400 "),
  inputGroup: clsx("flex flex-col gap-1"),
  input: clsx(
    "border text-slate-600 rounded-lg focus-within:outline-purple-500 px-2 py-2"
  ),
};

export default function WeatherForm({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  return (
    <form
      className=" max-w-screen-sm mx-auto  bg-white shadow-lg rounded-2xl px-5  py-7 grid gap-2 grid-cols-2 lg:grid-cols-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes.inputGroup}>
        <label className={classes.label} htmlFor="lat">
          Latitude
        </label>
        <input
          className={classes.input}
          required
          {...register("lat")}
          type="number"
          step="0.000001"
        />
      </div>
      <div className={classes.inputGroup}>
        <label className={classes.label} htmlFor="lon">
          Longitude
        </label>
        <input
          className={classes.input}
          required
          {...register("lon")}
          type="number"
          step="0.000001"
        />
      </div>
      <div className={classes.inputGroup}>
        <label className={classes.label} htmlFor="date">
          Date
        </label>
        <input
          className={classes.input}
          required
          type="date"
          {...register("date")}
          min={getMinAllowedDate()}
          max={getMaxAllowedDate()}
        />
      </div>

      <button
        className=" font-semibold shadow-sm bg-purple-400 transition-all text-white  hover:ring-2 active:ring-offset-2 col-span-full mt-10  px-4 py-1 mx-auto rounded-full ring-offset-1  ring-purple-400 "
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
