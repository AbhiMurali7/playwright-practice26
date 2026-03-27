import { test, expect } from "@playwright/test";
import {
  createBookingData,
  partialUpdateBookingData,
  updateBookingData,
} from "../../utils/dataFactory";

let token: string;

test.beforeAll(async ({ request }) => {
  const res = await request.post("/auth", {
    data: {
      username: "admin",
      password: "password123",
    },
  });

  const body = await res.json();
  token = body.token;
});

test.describe.serial("Booking Flow", () => {
  let bookingId: number;
  const payload = createBookingData();
  test("POST - Create booking", async ({ request }) => {
    const postRes = await request.post("/booking", {
      data: payload,
    });

    expect(postRes.status()).toBe(200);

    const postBody = await postRes.json();
    bookingId = postBody.bookingid;
    console.log(postBody);

    console.log("Created ID:", bookingId);
  });

  test("GET - Validate booking", async ({ request }) => {
    const getRes = await request.get(`/booking/${bookingId}`);

    expect(getRes.status()).toBe(200);

    const getBody = await getRes.json();

    // Validation
    expect(getBody.firstname).toBe(payload.firstname);
    expect(getBody.lastname).toBe(payload.lastname);
  });

  test("PUT - Update booking", async ({ request }) => {
    const updatePayload = updateBookingData();
    const putRes = await request.put(`/booking/${bookingId}`, {
      data: updatePayload,
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(putRes.status()).toBe(200);

    const putBody = await putRes.json();
    console.log(putBody);
  });
  test("PATCH - Partial Update Booking", async ({ request }) => {
    const partialUpdatePayload = partialUpdateBookingData();
    const patchRes = await request.patch(`/booking/${bookingId}`, {
      data: partialUpdatePayload,
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(patchRes.status()).toBe(200);

    const patchBody = await patchRes.json();
    expect(patchBody).toMatchObject(partialUpdatePayload);
  });
});
        