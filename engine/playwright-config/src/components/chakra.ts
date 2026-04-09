import type { Locator, Page } from '@playwright/test';

/**
 * Chakra UI 3.0 (Ark UI) component locators using data attributes.
 * These helpers use the data-scope, data-part, and data-state attributes
 * that Ark UI components expose for reliable test selectors.
 */

// ============================================================================
// Dialog / Modal
// ============================================================================

export function getDialogBackdrop(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="backdrop"]');
}

export function getDialogContent(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="content"]');
}

export function getDialogTitle(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="title"]');
}

export function getDialogDescription(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="description"]');
}

export function getDialogCloseTrigger(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="close-trigger"]');
}

// ============================================================================
// Drawer
// ============================================================================

export function getDrawerBackdrop(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="backdrop"]');
}

export function getDrawerContent(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="content"]');
}

export function getDrawerCloseTrigger(page: Page): Locator {
  return page.locator('[data-scope="dialog"][data-part="close-trigger"]');
}

// ============================================================================
// Menu / Dropdown
// ============================================================================

export function getMenuTrigger(page: Page): Locator {
  return page.locator('[data-scope="menu"][data-part="trigger"]');
}

export function getMenuContent(page: Page): Locator {
  return page.locator('[data-scope="menu"][data-part="content"]');
}

export function getMenuItem(page: Page, value?: string): Locator {
  if (value) {
    return page.locator(`[data-scope="menu"][data-part="item"][data-value="${value}"]`);
  }
  return page.locator('[data-scope="menu"][data-part="item"]');
}

// ============================================================================
// Select
// ============================================================================

export function getSelectTrigger(page: Page): Locator {
  return page.locator('[data-scope="select"][data-part="trigger"]');
}

export function getSelectContent(page: Page): Locator {
  return page.locator('[data-scope="select"][data-part="content"]');
}

export function getSelectItem(page: Page, value?: string): Locator {
  if (value) {
    return page.locator(`[data-scope="select"][data-part="item"][data-value="${value}"]`);
  }
  return page.locator('[data-scope="select"][data-part="item"]');
}

export function getSelectItemText(page: Page): Locator {
  return page.locator('[data-scope="select"][data-part="item-text"]');
}

// ============================================================================
// Tabs
// ============================================================================

export function getTabList(page: Page): Locator {
  return page.locator('[data-scope="tabs"][data-part="list"]');
}

export function getTabTrigger(page: Page, value?: string): Locator {
  if (value) {
    return page.locator(`[data-scope="tabs"][data-part="trigger"][data-value="${value}"]`);
  }
  return page.locator('[data-scope="tabs"][data-part="trigger"]');
}

export function getTabContent(page: Page, value?: string): Locator {
  if (value) {
    return page.locator(`[data-scope="tabs"][data-part="content"][data-value="${value}"]`);
  }
  return page.locator('[data-scope="tabs"][data-part="content"]');
}

// ============================================================================
// Accordion
// ============================================================================

export function getAccordionItem(page: Page, value?: string): Locator {
  if (value) {
    return page.locator(`[data-scope="accordion"][data-part="item"][data-value="${value}"]`);
  }
  return page.locator('[data-scope="accordion"][data-part="item"]');
}

export function getAccordionTrigger(page: Page, value?: string): Locator {
  const item = getAccordionItem(page, value);
  return item.locator('[data-part="item-trigger"]');
}

export function getAccordionContent(page: Page, value?: string): Locator {
  const item = getAccordionItem(page, value);
  return item.locator('[data-part="item-content"]');
}

// ============================================================================
// Tooltip
// ============================================================================

export function getTooltipTrigger(page: Page): Locator {
  return page.locator('[data-scope="tooltip"][data-part="trigger"]');
}

export function getTooltipContent(page: Page): Locator {
  return page.locator('[data-scope="tooltip"][data-part="content"]');
}

// ============================================================================
// Popover
// ============================================================================

export function getPopoverTrigger(page: Page): Locator {
  return page.locator('[data-scope="popover"][data-part="trigger"]');
}

export function getPopoverContent(page: Page): Locator {
  return page.locator('[data-scope="popover"][data-part="content"]');
}

export function getPopoverCloseTrigger(page: Page): Locator {
  return page.locator('[data-scope="popover"][data-part="close-trigger"]');
}

// ============================================================================
// Checkbox
// ============================================================================

export function getCheckboxRoot(page: Page): Locator {
  return page.locator('[data-scope="checkbox"][data-part="root"]');
}

export function getCheckboxControl(page: Page): Locator {
  return page.locator('[data-scope="checkbox"][data-part="control"]');
}

export function getCheckboxLabel(page: Page): Locator {
  return page.locator('[data-scope="checkbox"][data-part="label"]');
}

// ============================================================================
// Switch
// ============================================================================

export function getSwitchRoot(page: Page): Locator {
  return page.locator('[data-scope="switch"][data-part="root"]');
}

export function getSwitchControl(page: Page): Locator {
  return page.locator('[data-scope="switch"][data-part="control"]');
}

export function getSwitchThumb(page: Page): Locator {
  return page.locator('[data-scope="switch"][data-part="thumb"]');
}

// ============================================================================
// Slider
// ============================================================================

export function getSliderRoot(page: Page): Locator {
  return page.locator('[data-scope="slider"][data-part="root"]');
}

export function getSliderTrack(page: Page): Locator {
  return page.locator('[data-scope="slider"][data-part="track"]');
}

export function getSliderThumb(page: Page): Locator {
  return page.locator('[data-scope="slider"][data-part="thumb"]');
}

// ============================================================================
// Progress
// ============================================================================

export function getProgressRoot(page: Page): Locator {
  return page.locator('[data-scope="progress"][data-part="root"]');
}

export function getProgressTrack(page: Page): Locator {
  return page.locator('[data-scope="progress"][data-part="track"]');
}

export function getProgressRange(page: Page): Locator {
  return page.locator('[data-scope="progress"][data-part="range"]');
}

// ============================================================================
// State Assertions
// ============================================================================

/**
 * Check if an element has a specific data-state value.
 * Common states: 'open', 'closed', 'checked', 'unchecked', 'active', 'inactive'
 */
export async function hasState(locator: Locator, state: string): Promise<boolean> {
  const actualState = await locator.getAttribute('data-state');
  return actualState === state;
}

/**
 * Wait for an element to have a specific data-state value.
 */
export async function waitForState(
  locator: Locator,
  state: string,
  options?: { timeout?: number }
): Promise<void> {
  await locator.waitFor({ state: 'attached' });
  await locator.filter({ has: locator.page().locator(`[data-state="${state}"]`) }).waitFor(options);
}

// ============================================================================
// Generic Helpers
// ============================================================================

/**
 * Get any Ark UI component by scope and part.
 */
export function getArkComponent(page: Page, scope: string, part: string): Locator {
  return page.locator(`[data-scope="${scope}"][data-part="${part}"]`);
}

/**
 * Get any element by its data-state attribute.
 */
export function getByState(page: Page, state: string): Locator {
  return page.locator(`[data-state="${state}"]`);
}
