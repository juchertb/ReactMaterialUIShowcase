import { faker } from "@faker-js/faker/locale/en";
import { SchedulerEventCategoryIconEnum, } from '../../Utils/Types';
import { type SchedulerEventCategory, SchedulerEventCategories} from '../../Utils/Types';

import {
  randomDate,
  randomFloat,
  weightedArrayElement,
  weightedBoolean,
} from "./utils";

const pad = (n: number) => String(n).padStart(2, '0');
const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const fms = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default (db: any) => {
  let id = 0;
  var dateNow = new Date();

  return (
    Array.from(Array(50).keys())
      //.sort((a, b) => new Date(a.dateTime) - new Date(b.date))
      .map((command: any) => {
        const randomEventDateTime = randomDate(new Date(dateNow.getFullYear(), dateNow.getMonth()-1, 1), new Date(dateNow.getFullYear(), dateNow.getMonth()+1, 29));
        const randomRepeatEndDateTime = randomDate(new Date(dateNow.getFullYear(), dateNow.getMonth(), 1), new Date(dateNow.getFullYear()+2, dateNow.getMonth(), 29));
        return {
          id: id++,
          dateTime: randomEventDateTime,
          date: fmt(randomEventDateTime),
          title: faker.lorem.sentence(),
          startHour: fms(randomEventDateTime),
          category: SchedulerEventCategories[faker.number.int({ min: 0, max: SchedulerEventCategories.length - 1 })] as SchedulerEventCategory,
          organizer: faker.person.firstName() + ' ' + faker.person.lastName(),
          details: faker.lorem.paragraph(),
          isAllDay: faker.datatype.boolean(0.7),
          isRepeated: faker.datatype.boolean(0.4),
          repeatInterval: faker.helpers.arrayElement(["Daily", "Weekly", "Monthly", "Yearly"]),
          repeatEvery: faker.number.int({ min: 1, max: 12}),
          repeatOnWeekday: faker.number.int({ min: 1, max: 7}),
          repeatEnd: faker.helpers.arrayElement(["never", "on", "after"]),
          repeatEndOn: faker.number.int({ min: 1, max: 999}),
          repeatEndAfter: fmt(randomRepeatEndDateTime) + " " + fms(randomRepeatEndDateTime)
        };
      }
    )
  );
};
