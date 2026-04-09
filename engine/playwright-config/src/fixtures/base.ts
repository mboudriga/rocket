import { test as base, expect, type Page } from '@playwright/test';

export interface BaseFixtures {
  /** Disables CSS animations and transitions for stable tests */
  disableAnimations: undefined;
}

/**
 * Base fixtures for Playwright tests.
 * Extends the default test with useful utilities for Chakra UI testing.
 */
export const baseFixtures = base.extend<BaseFixtures>({
  /**
   * Automatically disables CSS animations and transitions.
   * This helps prevent flaky tests caused by animation timing.
   */
  disableAnimations: [
    async ({ page }, use) => {
      await page.addStyleTag({
        content: `
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-delay: 0.01ms !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0.01ms !important;
          }
        `,
      });
      await use(undefined);
    },
    { auto: true },
  ],
});

/**
 * Helper to wait for Chakra UI components to be fully rendered.
 * Useful after interactions that trigger state changes.
 */
export async function waitForChakraAnimation(page: Page): Promise<void> {
  // Wait for any pending animations to complete
  await page.waitForTimeout(50);
}

/**
 * Helper to wait for a portal content to appear in the DOM.
 * Chakra uses portals for overlays like modals, popovers, etc.
 */
export async function waitForPortal(page: Page): Promise<void> {
  await page.waitForSelector('[data-scope]', { state: 'attached' });
}

export { base, expect };
