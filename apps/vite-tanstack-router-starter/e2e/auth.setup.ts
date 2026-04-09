import { test as setup } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

/**
 * Authentication setup project.
 * This runs once before all tests and saves the authenticated state.
 * Other test projects depend on this and reuse the auth state.
 */
setup('authenticate', async ({ page }) => {
  // Navigate to login page
  await page.goto('/login');

  // Fill in credentials
  // TODO: Replace with actual test credentials or environment variables
  const testEmail = process.env.TEST_USER_EMAIL || 'test@example.com';
  const testPassword = process.env.TEST_USER_PASSWORD || 'testpassword';

  await page.getByLabel(/email/i).fill(testEmail);
  await page.getByLabel(/password/i).fill(testPassword);

  // Submit the login form
  await page.getByRole('button', { name: /sign in|log in/i }).click();

  // Wait for successful login - adjust the URL/selector based on your app
  await page.waitForURL((url) => !url.pathname.includes('/login'));

  // Optionally verify we're logged in
  // await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();

  // Save the authenticated state to a file
  await page.context().storageState({ path: authFile });
});
