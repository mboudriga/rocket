import { baseFixtures } from '@engine/playwright-config/fixtures';
import type { Page } from '@playwright/test';

/**
 * Authentication fixture for vite-tanstack-router-starter tests.
 * Provides login/logout helpers for authenticated test scenarios.
 */

export interface AuthFixtures {
  /** Pre-authenticated page that uses stored auth state */
  authenticatedPage: Page;
  /** Helper to perform login with credentials */
  login: (email: string, password: string) => Promise<void>;
  /** Helper to perform logout */
  logout: () => Promise<void>;
}

export const test = baseFixtures.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // The page already has auth state loaded from storageState
    await use(page);
  },

  login: async ({ page }, use) => {
    const loginFn = async (email: string, password: string) => {
      await page.goto('/login');
      await page.getByLabel(/email/i).fill(email);
      await page.getByLabel(/password/i).fill(password);
      await page.getByRole('button', { name: /sign in|log in/i }).click();
      // Wait for navigation after successful login
      await page.waitForURL((url) => !url.pathname.includes('/login'));
    };
    await use(loginFn);
  },

  logout: async ({ page }, use) => {
    const logoutFn = async () => {
      // Adjust this based on your app's logout mechanism
      await page.getByRole('button', { name: /logout|sign out/i }).click();
      await page.waitForURL(/\/(login)?$/);
    };
    await use(logoutFn);
  },
});

export { expect } from '@playwright/test';
