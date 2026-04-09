import { Docs } from '../../templates';

export const Writing_Tests = () => (
  <Docs.Template title="Writing Tests">
    <Docs.Code title="Unit Test Template" language="javascript" code={UNIT_TEST_TEMPLATE_CODE}>
      Every @rocket/ui component has a .test.tsx file following this pattern. Import render and screen
      from the shared test-utils which wraps components in RocketProvider. The render function returns a
      user object from @testing-library/user-event for simulating interactions.
    </Docs.Code>

    <Docs.Code title="Accessibility Testing" language="javascript" code={ACCESSIBILITY_TESTING_CODE}>
      Accessibility testing with vitest-axe is required for every component. The toHaveNoViolations
      matcher checks WCAG 2.1 Level AA rules. This catches missing labels, poor contrast, invalid ARIA
      attributes, and other accessibility issues.
    </Docs.Code>

    <Docs.Code title="E2E Test Template (Playwright)" language="javascript" code={E2E_TEST_TEMPLATE_CODE}>
      E2E tests use Playwright with the @engine/playwright-config shared setup. Tests run across
      Chromium, Firefox, and WebKit. Use role-based selectors (getByRole, getByLabel) for resilient
      tests.
    </Docs.Code>

    <Docs.Code title="Running Tests" language="bash" code={RUNNING_TESTS_CODE}>
      Vitest runs unit tests and Playwright runs E2E tests. Coverage uses the v8 provider and generates
      text, JSON, and HTML reports.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Contribution/Writing Tests',
  component: Writing_Tests,
};

const UNIT_TEST_TEMPLATE_CODE = `import { render, screen } from '../../test/test-utils';
import { ComponentName } from './ComponentName';
import { ComponentNameDefaultProps } from './ComponentName.types';

describe('ComponentName', () => {
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ComponentName {...ComponentNameDefaultProps} />
      );
      expect(container).toHaveNoViolations();
    });
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<ComponentName {...ComponentNameDefaultProps} />);
      // Assert the component renders correctly
    });

    it('should render children', () => {
      render(
        <ComponentName {...ComponentNameDefaultProps}>
          Test Content
        </ComponentName>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should handle click events', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <ComponentName {...ComponentNameDefaultProps} onClick={onClick} />
      );
      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});`;

const ACCESSIBILITY_TESTING_CODE = `import { render } from '../../test/test-utils';

// Every component must pass accessibility checks
it('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);

  // vitest-axe checks WCAG 2.1 Level AA rules
  expect(container).toHaveNoViolations();
});

// This is always the first describe block in every test file
// It catches: missing labels, poor contrast, invalid ARIA, etc.`;

const E2E_TEST_TEMPLATE_CODE = `import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome' }))
      .toBeVisible();
  });

  test('should navigate to settings', async ({ page }) => {
    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL(/settings/);
  });

  test('should submit a form', async ({ page }) => {
    await page.getByLabel('Name').fill('John');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Success')).toBeVisible();
  });
});`;

const RUNNING_TESTS_CODE = `# Run all unit tests
pnpm test

# Run tests in watch mode (re-runs on file changes)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run tests for a specific package
pnpm --filter @rocket/ui test

# Run a specific test file
pnpm --filter @rocket/ui test Button.test`;
