import { test, request, expect } from "@playwright/test";
import { createBookingData } from '../../utils/dataFactory';



test.skip("Creates a new booking using POST Endpoint", async ({ request }) => {
 const response = request.post("/booking", {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    }
  });

  const jsonResponse = (await response).json();
  console.log(jsonResponse);

});


test.skip('POST Booking API with Json Payload', async ({ request }) => {

  const payload = createBookingData();

  const res = await request.post('/booking', {
    data: payload
  });

  expect(res.status()).toBe(200);
  const postBody = await res.json();
  console.log(postBody);


});

