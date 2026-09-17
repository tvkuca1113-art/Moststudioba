export type Room = "kitchen" | "wardrobe" | "table";
export function dimensionBounds(room: Room) {
  return room === "kitchen"
    ? [180, 600]
    : room === "wardrobe"
      ? [100, 500]
      : [80, 280];
}
export function clampDimension(room: Room, value: number) {
  const [min, max] = dimensionBounds(room);
  return Math.min(
    max,
    Math.max(min, Math.round(Number.isFinite(value) ? value : min)),
  );
}
/** Demo availability only; no clinic calendar or booking API is connected. */
export function bookingDays(isoDay: string) {
  const days: string[] = [];
  const date = new Date(isoDay + "T12:00:00Z");
  while (days.length < 5) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6)
      days.push(date.toISOString().slice(0, 10));
  }
  return days;
}
export const demoTimes = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
export function demoTimeAvailable(
  dayIndex: number,
  serviceIndex: number,
  time: string,
) {
  return (
    demoTimes.includes(time) &&
    (demoTimes.indexOf(time) + dayIndex + serviceIndex) % 4 !== 1
  );
}
export type PlanArea = "finance" | "organisation" | "growth";
export function choosePlan(answers: PlanArea[]): PlanArea | null {
  if (answers.length !== 3) return null;
  const counts = { finance: 0, organisation: 0, growth: 0 };
  for (const answer of answers) counts[answer]++;
  const max = Math.max(...Object.values(counts));
  return answers.find((answer) => counts[answer] === max) ?? null;
}
