import { expect, test } from '@playwright/test';

test('landing page loads and navigates to dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'TanStack Start Starter' })).toBeVisible();

  await page.getByRole('link', { name: /get started/i }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('posts page loads with search and filter', async ({ page }) => {
  await page.goto('/posts');
  await expect(page.getByRole('heading', { name: 'Posts' })).toBeVisible();

  // Verify posts are rendered
  await expect(page.getByText(/posts found/)).toBeVisible();
});

test('can navigate to post detail', async ({ page }) => {
  await page.goto('/posts');

  // Click first post
  await page.locator('a[href*="/posts/"]').first().click();
  await expect(page.getByText('Back to Posts')).toBeVisible();
});

test('settings page loads', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/nonexistent-route');
  await expect(page.getByText('404')).toBeVisible();
});
