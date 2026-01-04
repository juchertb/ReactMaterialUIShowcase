import { faker } from "@faker-js/faker/locale/en";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";
import { uuidNoDashes } from "./utils";
import { Gender, Language, allChips } from "../../Utils/Types";

export default (db: any) => {
  let id = 1;

  return (
    Array.from(Array(1).keys())
      .map((command: any) => {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const email = faker.internet.email({ firstName: firstname, lastName: lastname });
        return {
          id,
          firstname,
          lastname,
          gender: faker.helpers.arrayElement( Object.values(Gender).filter(v => typeof v === "number") ),
          birthDate: faker.date.past({ years: 60 }),
          email,
          location: faker.location.city() + ", " + faker.location.country(),
          phone: faker.helpers.replaceSymbols("###-###-####"),
          language: faker.helpers.arrayElement( Object.values(Language).filter(v => typeof v === "number") ),
          avatar: faker.image.avatar(),
          tags: faker.helpers.arrayElements(Object.values(allChips), { min: 2, max: 5 })
         };
      }
    )
  );
};
