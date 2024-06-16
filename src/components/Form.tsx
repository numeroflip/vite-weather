import { useForm } from "react-hook-form";
import { getMaxAllowedDate, getMinAllowedDate } from "../lib/services/weather";
import { toDateString } from "../lib/utils/date";

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

export default function WeatherForm({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  return (
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
  );
}
