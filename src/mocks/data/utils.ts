import { faker } from "@faker-js/faker/locale/en";

export const weightedArrayElement = (values: number[], weights: number[]) =>
  faker.helpers.arrayElement(
    values.reduce(
      (acc, value, index) => acc.concat(new Array(weights[index]).fill(value)),
      [] as number[]
    )
  );

export const weightedBoolean = (likelyhood: number) =>
  faker.number.int(99) < likelyhood;

export const randomDate = (minDate: Date | null = null, maxDate: Date | null = null) => {
  const minTs =
    minDate instanceof Date
      ? minDate.getTime()
      : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
  const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
  const range = maxTs - minTs;
  const randomRange = faker.number.int({ max: range });
  // move it more towards today to account for traffic increase
  const ts = Math.sqrt(randomRange / range) * range;
  return new Date(minTs + ts);
};

export const randomFloat = (min: number, max: number) =>
  parseFloat(faker.number.float({ min, max, fractionDigits: 2 }).toFixed(2));

export const uuidNoDashes = () => {
  return faker.string.uuid().replace(/-/g, "");
};
