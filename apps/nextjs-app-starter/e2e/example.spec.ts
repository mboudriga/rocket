import { expect, test } from '@playwright/test';

test('landing page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Next.js App Starter' })).toBeVisible();
});

test('can navigate to dashboard', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /dashboard/i }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('items page loads', async ({ page }) => {
  await page.goto('/items');
  await expect(page.getByRole('heading', { name: 'Items' })).toBeVisible();
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent-route');
  await expect(page.getByText('404')).toBeVisible();
});
