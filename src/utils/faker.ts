import { faker } from "@faker-js/faker";

export interface Faker {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  numbers: string[];
}

const number = () => {
  return faker.string.numeric(9)
}

export function randomDataFaker(): Faker {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    numbers: Array.from({ length: 4 }, number)
  }
}