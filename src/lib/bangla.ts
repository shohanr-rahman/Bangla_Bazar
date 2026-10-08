const DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => DIGITS[Number(d)]);

// ১,৮৫০ বা ১৪৮ এভাবে দেখাবে
export const formatPrice = (n: number) => toBn(n.toLocaleString("en-IN"));

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  hali: "প্রতি হালি",
};

export const unitLabel = (unit: string) =>
  UNITS[unit.toLowerCase()] ?? `প্রতি ${unit}`;

const WEEKDAYS: Record<string, string> = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

const MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

// যেমন: মঙ্গলবার, ৬ অক্টোবর, ২০২৬ (ঢাকার সময় অনুযায়ী)
export function banglaToday(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = WEEKDAYS[get("weekday")] ?? "";
  const month = MONTHS[Number(get("month")) - 1] ?? "";

  return `${weekday}, ${toBn(get("day"))} ${month}, ${toBn(get("year"))}`;
}
// "প্রতি কেজি" থেকে শুধু "কেজি"
export const shortUnit = (unit: string) =>
  unitLabel(unit).replace("প্রতি ", "");

// দাম বাড়া/কমার badge: সবুজ ▲, লাল ▼, ধূসর —
export function changeInfo(change: { dir: string; pct: number }) {
  const pct = toBn(Math.abs(change.pct).toFixed(1));

  if (change.dir === "up" && change.pct !== 0) {
    return {
      text: `▲ ${pct}%`,
      className: "text-success",
      badgeClass: "bg-success/15 text-success",
    };
  }
  if (change.dir === "down" && change.pct !== 0) {
    return {
      text: `▼ ${pct}%`,
      className: "text-error",
      badgeClass: "bg-error/15 text-error",
    };
  }
  return {
    text: `—${toBn("0.0")}%`,
    className: "text-gray-500",
    badgeClass: "bg-gray-200 text-gray-500",
  };
}