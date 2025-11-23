import { faker } from "@faker-js/faker/locale/en";
import { uuidNoDashes } from "./utils";

const roles = ["Market", "Finance", "Development"];

export default () => [
  {
    id: uuidNoDashes(),
    customerId: 1,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 1, max: 120 }),
    joinDate: faker.date.past({ years: 10 }),
    role: faker.helpers.arrayElement(roles),
  },
  {
    id: uuidNoDashes(),
    customerId: 2,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 1, max: 120 }),
    joinDate: faker.date.past({ years: 10 }),
    role: faker.helpers.arrayElement(roles),
  },
  {
    id: uuidNoDashes(),
    customerId: 3,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 1, max: 120 }),
    joinDate: faker.date.past({ years: 10 }),
    role: faker.helpers.arrayElement(roles),
  },
  {
    id: uuidNoDashes(),
    customerId: 4,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 1, max: 120 }),
    joinDate: faker.date.past({ years: 10 }),
    role: faker.helpers.arrayElement(roles),
  },
  {
    id: uuidNoDashes(),
    customerId: 5,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 1, max: 120 }),
    joinDate: faker.date.past({ years: 10 }),
    role: faker.helpers.arrayElement(roles),
  },
];
