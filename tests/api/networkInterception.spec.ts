import { test, expect } from "@playwright/test";

test('Payment success page should show', async ({ page }) => {
    
    // API call intercept பண்றோம்
    await page.route('**/api/payment', async route => {
        
        // Fake success response கொடுக்கிறோம்
        await route.fulfill({
            status: 200,
            body: JSON.stringify({ 
                status: 'success',
                message: 'Payment completed' 
            })
        });
    });

    // UI test பண்றோம்
    await page.goto('/payment');
    await page.click('#payBtn');
    
    // Fake response-ஐ வெச்சு UI verify
    await expect(page.locator('.success-msg')).toBeVisible();
});

test('Should show error on login fail', async ({ page }) => {
    
    // Step 1 — Intercept பண்ணு
    await page.route('**/api/verifyLogin', route => {
        route.fulfill({
            status: 401,
            body: JSON.stringify({ 
                message: 'Invalid credentials' 
            })
        });
    });

    // Step 2 — Login page போ
    await page.goto('https://automationexercise.com/login');
    
    // Step 3 — Login try பண்ணு
    await page.fill('[data-qa="login-email"]', 'test@gmail.com');
    await page.fill('[data-qa="login-password"]', 'wrongpassword');
    await page.click('[data-qa="login-button"]');
    
    // Step 4 — Error message verify
    await expect(page.locator('.error-message')).toBeVisible();
});


// ## Key Point:
// ```
// page.route() → Before page.goto() எழுதணும்!

// ❌ Wrong:
// await page.goto('/login');
// await page.route(...)  // Too late!

// ✅ Correct:
// await page.route(...)  // First!
// await page.goto('/login');