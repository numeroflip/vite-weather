export function toDateString(date: Date) {
  return date.toISOString().split("T")[0];
}
