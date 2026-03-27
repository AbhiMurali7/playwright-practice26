import { faker } from "@faker-js/faker";
import userData from "../testdata/userData.json";

export function createBookingData() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 500 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: faker.date.past().toISOString().split("T")[0],
      checkout: faker.date.future().toISOString().split("T")[0],
    },
    job: userData.additionalneeds,  //static data
  };
}

export function updateBookingData() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 500 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: faker.date.past().toISOString().split("T")[0],
      checkout: faker.date.future().toISOString().split("T")[0],
    },
    job: userData.additionalneeds,
  }

}

export function partialUpdateBookingData() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    //totalprice: faker.number.int({ min: 100, max: 500 }),
    //depositpaid: faker.datatype.boolean(),
    // bookingdates: {
    //   checkin: faker.date.past().toISOString().split("T")[0],
    //   checkout: faker.date.future().toISOString().split("T")[0],
    // },
    //job: userData.additionalneeds,
  }

}