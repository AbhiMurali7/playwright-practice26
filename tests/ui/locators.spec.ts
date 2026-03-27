import { test, expect } from '@playwright/test';

test('getByRole Practice', async ({ page }) => {
  // Timeout increase பண்ணு - 60 seconds
  await page.goto('https://www.automationexercise.com', {
    timeout: 60000,
    waitUntil: 'domcontentloaded' // full load wait பண்ணாம DOM ready ஆனதும் போ
  });

  // Signup link click பண்ணு
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // Login heading visible check பண்ணு
  await expect(
    page.getByRole('heading', { name: 'Login to your account' })
  ).toBeVisible();

  // Email fill பண்ணு
  await page.locator('input[data-qa="login-email"]').fill('test@gmail.com');

  // Password fill பண்ணு
  await page.locator('input[data-qa="login-password"]').fill('pass123');

  console.log('✅ getByRole test passed!');
});


test('getByText, getByLabel, getByPlaceholder', async ({ page }) => {
  await page.goto('https://www.automationexercise.com', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  // Link click பண்ணு
  await page.getByText('Signup / Login').click();

  const loginForm = page.locator('form').filter({ hasText: 'Login' });

  // Login form-ல் மட்டும் fill பண்ணு
  await loginForm.getByPlaceholder('Email Address').fill('test@gmail.com');
  await loginForm.getByPlaceholder('Password').fill('pass123');
  await loginForm.getByText('Login').click();

  console.log('✅ Test passed!');
});

test('getByLabel Practice', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  // Ads block பண்றதுக்கு முன்னாடி scroll பண்ணு
  await page.evaluate(() => window.scrollTo(0, 300));

  // Wait பண்ணு
  await page.waitForTimeout(2000);

  // Full Name fill பண்ணு
  await page.locator('#userName').fill('Kumar Test');

  // Email fill பண்ணு
  await page.locator('#userEmail').fill('kumar@test.com');

  // Current Address fill பண்ணு
  await page.locator('#currentAddress').fill('Chennai, Tamil Nadu');

  // Submit click பண்ணு
  await page.locator('#submit').click();

  // Result check பண்ணு
  await expect(page.locator('#output')).toBeVisible();

  console.log('✅ getByLabel test passed!');
});

test('nth & filter Practice', async ({ page }) => {
  await page.goto('https://www.automationexercise.com', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  // Page-ல் எத்தனை "Add to cart" buttons இருக்குன்னு count பண்ணு
  const addToCartBtns = page.getByText('Add to cart');
  const count = await addToCartBtns.count();
  console.log(`Total Add to cart buttons: ${count}`);

  // First product "View Product" click பண்ணு
  await page.getByRole('link', { name: 'View Product' }).first().click();

  // Product page-ல் இருக்கான்னு check பண்ணு
  await expect(page).toHaveURL(/product_details/);

  console.log('✅ nth test passed!');
});

test('filter Practice', async ({ page }) => {
  await page.goto('https://www.automationexercise.com', {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  // "Blue Top" text உள்ள product find பண்ணி
  // அதுக்கு next உள்ள View Product click பண்ணு
  await page.locator('.product-image-wrapper')
    .filter({ hasText: 'Blue Top' })
    .getByRole('link', { name: 'View Product' })
    .click();

  // URL check பண்ணு
  await expect(page).toHaveURL(/product_details/);

  console.log('✅ filter test passed!');
});




// test('Practice', async ({ page }) => {
  
// // <div class="order-card">
// //   <p>Order #1001</p>
// //   <button>Cancel</button>
// // </div>
// // <div class="order-card">
// //   <p>Order #1002</p>
// //   <button>Cancel</button>
// // </div>

// // "Order #1002" உள்ள card-ல்
// // "Cancel" button மட்டும் click பண்ணு
// // filter() use பண்ணு

// await page.locator('.order-card')
//           .filter({ hasText : 'Order #1002'})
//           .getByRole('button', { name : 'Cancel'})
//           .click();




// // இந்த HTML-ல்:

// // <a href="/products">View All Products</a>

// // XPath use பண்ணி

// // "View All Products" link find பண்ணு

// await page.locator('//a[text() = "View All Products"]')


// // Login form-ல் மட்டும்:
// // <div class="login-section">
// //   <input placeholder="Email"/>
// //   <input placeholder="Password"/>
// //   <button>Login</button>
// // </div>
// // <div class="signup-section">
// //   <input placeholder="Email"/>    ← same!
// //   <input placeholder="Password"/> ← same!
// //   <button>Signup</button>
// // </div>

// // Login form-ல் மட்டும் fill பண்ணி click பண்ணு

// await page.locator('.login-section')
//           .getByPlaceholder('Email')
//           .fill("test@gamil.com");

// await page.locator('.login-section')
//           .getByPlaceholder('Password')
//           .fill("test1234");     
          
// await page.locator('.login-section')
//   .getByRole('button', { name: 'Login' })
//   .click();   

//   // Products list-ல்:
// // "iPhone 15" உள்ள product card find பண்ணி
// // அதுல உள்ள price text print பண்ணு

// // <div class="product-card">
// //   <h3>iPhone 15</h3>
// //   <span class="price">₹79,990</span>
// //   <button>Add to Cart</button>
// // </div>

// // Hint:
// const card = page.locator('.product-card').filter({ hasText: 'iPhone 15' });
// const price = await card.locator('.price').textContent();
// console.log(price);



// })



