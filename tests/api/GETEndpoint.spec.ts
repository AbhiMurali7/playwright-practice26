import { test, request, expect, APIRequestContext } from "@playwright/test";

let apiContext3: APIRequestContext;

test.beforeAll(async ({}) => {
  apiContext3 = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
    //headers
    extraHTTPHeaders: {
      Accept: "application/json",
    },
  });
});

test.skip("GET Endpoint Method 1", async ({ request }) => {
  const response = await request.get(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  console.log(await response.json());
});

test.skip("GET Endpoint Method 2", async ({}) => {
  const apiContext = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
    //headers
    extraHTTPHeaders: {
      Accept: "application/json",
    },
  });

  const response = await apiContext.get("/booking");

  console.log(await response.json());
});

test.skip("GET Endpoint Method 3", async ({}) => {
  const response = await apiContext3.get("/booking");

  console.log(await response.json());
});

test.skip("GET Endpoint Method 4", async ({ request }) => {
  //playwright.config.ts la baseurl passed
  const response = await request.get("/booking");

  console.log(await response.json());
});

test.skip("GET Endpoint Method 5 with query params", async ({ request }) => {
  //playwright.config.ts la baseurl passed
  const response = await request.get("/booking", {
    params: {
      firstname: "Margaret",
      lastname: "Koelpin",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);
});

test.skip("GET Endpoint Method 6 with assertions", async ({ request }) => {
  //playwright.config.ts la baseurl passed
  const response = await request.get("/booking/3230");

  const jsonbody = await response.json();
  console.log(jsonbody);
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(jsonbody.firstname).toContain("Lauriane");
  expect(jsonbody.lastname).toContain("Murphy");
  expect(jsonbody.totalprice).toBe(911);
  expect(jsonbody.depositpaid).toBe(true);
  expect(jsonbody).toMatchObject({
    firstname: "Lauriane",
    lastname: "Murphy",
    totalprice: 911,
    depositpaid: true,
    bookingdates: { checkin: "2025-08-14", checkout: "2026-04-03" },
    additionalneeds: "Need Lunch",
  });
});
