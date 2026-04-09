import { expect, test } from './fixtures/auth';

test.describe('Rocket App', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // Basic smoke test - verify the page loads
    await expect(page).toHaveTitle(/.*/);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');

    // TODO: Add navigation tests specific to your app
    // Example: Test that main navigation links work
  });
});

test.describe('Authenticated flows', () => {
  test('user can access protected route', async ({ authenticatedPage }) => {
    // This test uses the pre-authenticated state
    await authenticatedPage.goto('/dashboard');

    // TODO: Add assertions for authenticated content
    await expect(authenticatedPage).toHaveURL(/dashboard/);
  });
});
