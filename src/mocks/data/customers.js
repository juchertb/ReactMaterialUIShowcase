//import { date, person, internet, location } from "@faker-js/faker/locale/en";

import { faker } from "@faker-js/faker/locale/en";
import { randomDate, weightedBoolean } from "./utils";

const roles = ["Market", "Finance", "Development"];

export default (db, { serializeDate }) =>
  Array.from(Array(900).keys()).map((id) => {
    const first_seen = randomDate();
    const last_seen = randomDate(first_seen);
    const has_ordered = weightedBoolean(25);
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const full_name = first_name + " " + last_name;
    const email = faker.internet.email(first_name, last_name);
    const birthday = has_ordered ? faker.date.past(60) : null;
    return {
      id,
      first_name,
      last_name,
      email,
      address: has_ordered ? faker.location.street() : null,
      zipcode: has_ordered ? faker.location.zipCode() : null,
      city: has_ordered ? faker.location.city() : null,
      avatar: faker.image.avatar(),
      birthday: serializeDate && birthday ? birthday.toISOString() : birthday,
      first_seen: serializeDate ? first_seen.toISOString() : first_seen,
      last_seen: serializeDate ? last_seen.toISOString() : last_seen,
      has_ordered: has_ordered,
      latest_purchase: null, // finalize
      has_newsletter: has_ordered ? weightedBoolean(30) : true,
      groups: [], // finalize
      nb_commands: 0,
      total_spent: 0,
      sex: faker.person.sex(),
      home_phone: faker.phone.number("###-###-####"),
      mobile_phone: faker.phone.number("###-###-####"),
      position: faker.person.jobTitle(),
      twitter_url: faker.internet.url(),
      instagram_url: faker.internet.url(),
      facebook_url: faker.internet.url(),
      linkedIn_url: faker.internet.url(),
      role: faker.helpers.arrayElement(roles),
    };
  });
