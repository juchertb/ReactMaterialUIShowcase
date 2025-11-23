export const dataset = [
  {
    label: "16-20",
    value: 15,
  },
  {
    label: "21-25",
    value: 20,
  },
  {
    label: "26-30",
    value: 12,
  },
  {
    label: "31-36",
    value: 60,
  },
  {
    label: "36-42",
    value: 20,
  },
  {
    label: "42+",
    value: 15,
  },
];

export function valueFormatter(value: number | null) {
  return `${value} items`;
}
