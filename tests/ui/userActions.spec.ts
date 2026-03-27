import { test, expect } from "@playwright/test";

test("Click and Typing Practice", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // 1. fill() use பண்ணி Full Name fill பண்ணு
  await page.locator("#userName").fill("Kumar Test");

  // 2. fill() use பண்ணி Email fill பண்ணு
  await page.locator("#userEmail").fill("kumar@test.com");

  // 3. type() use பண்ணி Current Address type பண்ணு
  await page.locator("#currentAddress").type("Chennai, Tamil Nadu");

  // 4. Submit click பண்ணு
  await page.locator("#submit").click();

  // 5. Output visible-ஆ இருக்கான்னு check பண்ணு
  await expect(page.locator("#output")).toBeVisible();

  console.log("✅ Click & Typing passed!");
});

test("Dropdown Practice", async ({ page }) => {
  await page.goto("https://demoqa.com/select-menu", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // 1. Select value by text
  await page.locator("#oldSelectMenu").selectOption("1");

  // 2. Select by label
  await page.locator("#oldSelectMenu").selectOption({ label: "Blue" });

  console.log("✅ Dropdown passed!");
});

test("Checkbox and Radio Practice", async ({ page }) => {
  await page.goto("https://demoqa.com/radio-button", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // 1. "Yes" radio button select பண்ணு
  await page.getByRole("radio", { name: "Yes" }).check({ force: true });

  // 2. Checked-ஆ இருக்கான்னு verify பண்ணு
  const isChecked = await page.getByRole("radio", { name: "Yes" }).isChecked();
  console.log(`Yes radio checked: ${isChecked}`);

  // 3. Success message visible-ஆ இருக்கான்னு check பண்ணு
  await expect(page.locator(".mt-3")).toContainText("Yes");

  console.log("✅ Radio Button passed!");
});

test("File Upload Practice", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // 1. File upload பண்ணு
  await page.locator("#uploadFile").setInputFiles("package.json");

  // 2. Uploaded file name visible-ஆ இருக்கான்னு check பண்ணு
  await expect(page.locator("#uploadedFilePath")).toContainText("package.json");

  console.log("✅ File Upload passed!");
});

test("Hover Practice", async ({ page }) => {
  await page.goto("https://www.automationexercise.com", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // Product image-ஓட மேல hover பண்ணு
  await page.locator(".product-image-wrapper").first().hover();

  // Hover பண்ணா "Add to cart" visible ஆகும்!
  await expect(page.locator(".product-overlay").first()).toBeVisible();

  console.log("✅ Hover passed!");
});

test("Alert Practice", async ({ page }) => {
  await page.goto("https://demoqa.com/alerts", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // 1. Simple Alert
  page.on("dialog", async (dialog) => {
    console.log(`Alert message: ${dialog.message()}`);
    await dialog.accept();
  });

  // 2. Alert button click பண்ணு
  await page.locator("#alertButton").click();
  console.log("✅ Alert accepted!");

  // 3. Confirm box
  await page.locator("#confirmButton").click();
  console.log("✅ Confirm accepted!");

  // 4. Prompt box
  await page.locator("#promtButton").click();
  console.log("✅ Prompt accepted!");

  console.log("✅ Alerts passed!");
});

test("Drag and Drop Practice", async ({ page }) => {
  await page.goto("https://demoqa.com/droppable", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  const simpleTab = page.getByRole("tabpanel", { name: "Simple" });
  const source = simpleTab.locator("#draggable");
  const target = simpleTab.locator("#droppable");

  // Before drag
  const beforeText = await target.textContent();
  console.log(`Before drag: ${beforeText}`);

  // ✅ Manual drag — more reliable!
  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();

  await page.mouse.move(
    sourceBox!.x + sourceBox!.width / 2,
    sourceBox!.y + sourceBox!.height / 2,
  );
  await page.mouse.down();
  await page.waitForTimeout(500);
  await page.mouse.move(
    targetBox!.x + targetBox!.width / 2,
    targetBox!.y + targetBox!.height / 2,
    { steps: 10 },
  );
  await page.waitForTimeout(500);
  await page.mouse.up();

  // After drag check பண்ணு
  const afterText = await target.textContent();
  console.log(`After drag: ${afterText}`);

  console.log("✅ Drag and Drop passed!");
});

test("iFrame Practice", async ({ page }) => {
  await page.goto("https://demoqa.com/frames", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // Frame 1 — large frame
  const frame1 = page.frameLocator("#frame1");
  const frame1Text = await frame1.locator("#sampleHeading").textContent();
  console.log(`Frame 1 text: ${frame1Text}`);

  // Frame 2 — small frame
  const frame2 = page.frameLocator("#frame2");
  const frame2Text = await frame2.locator("#sampleHeading").textContent();
  console.log(`Frame 2 text: ${frame2Text}`);

  // Both frames same text இருக்கான்னு check பண்ணு
  expect(frame1Text).toBe(frame2Text);

  console.log("✅ iFrame passed!");
});

test("Multiple Tabs Practice", async ({ page, context }) => {
  await page.goto("https://demoqa.com/links", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  // 1. New tab open ஆகும் link click பண்ணு
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("#simpleLink").click(),
  ]);

  // 2. New tab load ஆகும் வரை wait பண்ணு
  await newPage.waitForLoadState();

  // 3. New tab title print பண்ணு
  const newTabTitle = await newPage.title();
  console.log(`New tab title: ${newTabTitle}`);

  // 4. New tab URL check பண்ணு
  console.log(`New tab URL: ${newPage.url()}`);

  // 5. Original tab-ல் இன்னும் இருக்கான்னு check பண்ணு
  console.log(`Original tab URL: ${page.url()}`);

  // 6. New tab close பண்ணு
  await newPage.close();

  console.log("✅ Multiple Tabs passed!");
});


// // Q1 — Easy (Click)

// // typescript
// //  இந்த HTML-ல்:
// // <button id="deleteBtn">Delete</button>

// //  1. Normal click பண்ணு
// //  2. Double click பண்ணு
// // 3. Right click பண்ணு

// test("Click", async ({ page }) => {
//   await page.getByRole("button", { name: "Delete" }).click(); //Normal Click
//   await page.getByRole("button", { name: "Delete" }).dblclick(); //Double Click
//   await page.getByRole("button", { name: "Delete" }).click({ button: "right" }); //Right click
// });

// // Q2 — Easy (Typing)

// // typescript
// // இந்த HTML-ல்:
// // <input id="search" placeholder="Search products"/>

// // 1. fill() use பண்ணி "Playwright" type பண்ணு
// // 2. Clear பண்ணு
// // 3. type() use பண்ணி "Automation" type பண்ணு
// // 4. Enter press பண்ணு

// test("Fill and Type", async ({ page }) => {
//   await page.getByPlaceholder("Search products").fill("Playwright");
//   await page.getByPlaceholder("Search products").clear();
//   await page
//     .getByPlaceholder("Search products")
//     .pressSequentially("Automation");
//   await page.keyboard.press("Enter");
// });

// // Q3 — Medium (Dropdown)

// // typescript
// // இந்த HTML-ல்:
// // <select id="country">
// //   <option value="in">India</option>
// //   <option value="us">USA</option>
// //   <option value="uk">UK</option>
// // </select>

// // 1. Value use பண்ணி "India" select பண்ணு
// // 2. Label use பண்ணி "USA" select பண்ணு
// // 3. Index use பண்ணி 3rd option select பண்ணு

// test("Dropdown", async ({ page }) => {
//   await page.locator("#country").selectOption("in");
//   await page.locator("#country").selectOption({ label: "USA" });
//   await page.locator("#country").selectOption({ index: 2 });
// });

// // Q4 — Medium (Checkbox)

// // typescript
// // இந்த HTML-ல்:
// // <input type="checkbox" id="terms"/> I agree to terms
// // <input type="checkbox" id="newsletter"/> Subscribe newsletter

// // 1. Terms checkbox check பண்ணு
// // 2. Checked-ஆ இருக்கான்னு verify பண்ணு
// // 3. Newsletter checkbox check பண்ணி
// //    அப்புறம் uncheck பண்ணு

// test("Check", async ({ page }) => {
//   await page.getByRole("checkbox", { name: "I agree to terms" }).check();
//   // isChecked() — boolean return
//   const checked = await page.getByRole("checkbox").isChecked();
//   console.log(checked); // true or false

//   // toBeChecked() — assertion, test fail ஆகும் if not checked
//   await expect(page.getByRole("checkbox")).toBeChecked();
//   await page.getByRole("checkbox", { name: "Subscribe newsletter" }).check();
//   await page.getByRole("checkbox", { name: "Subscribe newsletter" }).uncheck();
// });

// // Q5 — Medium (Alert)

// // typescript
// // இந்த scenario:
// // Button click பண்ணா Alert வருது
// // Alert message = "Are you sure you want to delete?"
// // OK click பண்ணணும்

// // 1. Alert handle பண்ணு
// // 2. Message print பண்ணு
// // 3. Accept பண்ணு
// // 4. Button click பண்ணு

// test("Alert", async ({ page }) => {
//   // Step 1 & 2 & 3 — Listen, Print, Accept
//   page.on("dialog", async (dialog) => {
//     console.log(dialog.message()); // "Are you sure you want to delete?"
//     await dialog.accept(); // OK click
//   });

//   // Step 4 — Button click (alert trigger ஆகும்)
//   await page.getByRole("button", { name: "Delete" }).click();
// });

// // Q6 — Medium (File Upload)

// // typescript
// // இந்த HTML-ல்:
// // <input type="file" id="profilePhoto"/>

// // 1. "photo.jpg" file upload பண்ணு
// // 2. Clear பண்ணு (empty array use பண்ணு)
// // 3. Multiple files upload பண்ணு
// //    "photo.jpg" and "resume.pdf"

// test("File Upload", async ({ page }) => {
//   await page.locator("#profilePhoto").setInputFiles("photo.jpg");
//   await page.locator("#profilePhoto").setInputFiles([]);
//   await page
//     .locator("#profilePhoto")
//     .setInputFiles(["photo.jpg", "resume.pdf"]);
// });

// // Q7 — Hard (iFrame)

// // typescript
// // இந்த HTML-ல்:
// // <iframe id="paymentFrame">
// //   <input id="cardNumber" placeholder="Card Number"/>
// //   <input id="cvv" placeholder="CVV"/>
// //   <button id="pay">Pay Now</button>
// // </iframe>

// // 1. iFrame-க்கு switch பண்ணு
// // 2. Card number fill பண்ணு "4111111111111111"
// // 3. CVV fill பண்ணு "123"
// // 4. Pay Now click பண்ணு

// test("iFrame", async ({ page }) => {
//   const frame = page.frameLocator("#paymentFrame");
//   await frame.locator("#cardNumber").fill("4111111111111111");
//   await frame.locator("#cvv").fill("123");
//   await frame.getByRole("button", { name: "Pay Now" }).click();
// });

// // Q8 — Hard (Multiple Tabs)

// // typescript
// // இந்த scenario:
// // "Terms & Conditions" link click பண்ணா
// // New tab-ல் open ஆகும்

// // 1. New tab open ஆகும் வரை wait பண்ணு
// // 2. New tab title print பண்ணு
// // 3. New tab-ல் "I Accept" button click பண்ணு
// // 4. New tab close பண்ணு
// // 5. Original tab-ல் continue பண்ணு

// test("Multiple Tabs", async ({ page, context }) => {
//   // Step 1 — New tab open ஆகும் வரை wait பண்ணு
//   const [newTab] = await Promise.all([
//     context.waitForEvent("page"),
//     page.getByRole("link", { name: "Terms & Conditions" }).click(),
//   ]);

//   // New tab load ஆகும் வரை wait பண்ணு
//   await newTab.waitForLoadState();

//   // Step 2 — New tab title print பண்ணு
//   console.log(await newTab.title());

//   // Step 3 — New tab-ல் "I Accept" click பண்ணு
//   await newTab.getByRole("button", { name: "I Accept" }).click();

//   // Step 4 — New tab close பண்ணு
//   await newTab.close();

//   // Step 5 — Original tab-ல் continue பண்ணு (page variable same!)
//   await page.getByRole("button", { name: "Continue" }).click();
// });

// Q9 — Hard (Combine Everything!)

// typescript
// E-commerce checkout flow:
// 1. Product page போ
// 2. Quantity dropdown-ல் "2" select பண்ணு
// 3. "Add to Cart" click பண்ணு
// 4. Alert வந்தா accept பண்ணு
// 5. Checkout form-ல்:
//    - Name fill பண்ணு
//    - Country dropdown select பண்ணு
//    - Terms checkbox check பண்ணு
// 6. iFrame-ல் உள்ள payment form fill பண்ணு
// 7. New tab-ல் open ஆகும் confirmation page title print பண்ணு

test('E-commerce checkout flow', async ({ page, context }) => {
  // Step 1 — Product page
  await page.goto('https://product-page.com');

  // Step 2 — Quantity dropdown
  await page.locator('#quantity').selectOption({ index: 1 });

  // Step 3 & 4 — Alert handle பண்ணி Add to Cart click
  page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  }); // ✅ Dialog callback இங்கயே முடியணும்!

  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Step 5 — Checkout form
  await page.getByRole('textbox', { name: 'Name' }).fill('Abhi');
  await page.locator('#country').selectOption({ label: 'India' });
  await page.getByRole('checkbox', { name: 'Terms' }).check();

  // Step 6 — iFrame payment
  const frame = page.frameLocator('#paymentFrame');
  await frame.locator('#cardNumber').fill('4111111111111111');
  await frame.locator('#cvv').fill('123');

  // Step 7 — New tab confirmation
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    frame.getByRole('button', { name: 'Pay Now' }).click()
  ]);

  await newTab.waitForLoadState();
  console.log(await newTab.title());
});
