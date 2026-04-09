import { devices, type PlaywrightTestConfig } from '@playwright/test';

export interface BaseConfigOptions {
  /** Base URL for the application (e.g., 'http://localhost:3000') */
  baseURL: string;
  /** Test directory relative to the config file */
  testDir?: string;
  /** Command to start the dev server */
  webServerCommand?: string;
  /** Whether to include authentication setup project */
  hasAuthSetup?: boolean;
  /** Path to auth storage state (relative to testDir) */
  authStoragePath?: string;
  /** Fail the test suite if any test is flaky (defaults to true in CI) */
  failOnFlakyTests?: boolean;
  /** Capture git info in test reports */
  captureGitInfo?: { commit?: boolean; diff?: boolean };
}

/**
 * Creates a shared Playwright configuration for apps in this monorepo.
 * Includes sensible defaults for Chakra UI testing.
 */
export function createBaseConfig(options: BaseConfigOptions): PlaywrightTestConfig {
  const {
    baseURL,
    testDir = './e2e',
    webServerCommand = 'pnpm dev',
    hasAuthSetup = false,
    authStoragePath = '.auth/user.json',
    failOnFlakyTests = !!process.env.CI,
    captureGitInfo = { commit: true, diff: true },
  } = options;

  const projects: PlaywrightTestConfig['projects'] = [];

  // Add auth setup project if needed
  if (hasAuthSetup) {
    projects.push({
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    });
  }

  // Desktop browsers
  const desktopProjects = [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ];

  // Mobile browsers
  const mobileProjects = [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ];

  // Add dependencies if auth setup exists
  const browserProjects = [...desktopProjects, ...mobileProjects].map((project) => ({
    ...project,
    ...(hasAuthSetup && {
      dependencies: ['setup'],
      use: {
        ...project.use,
        storageState: `${testDir}/${authStoragePath}`,
      },
    }),
  }));

  projects.push(...browserProjects);

  return {
    testDir,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    failOnFlakyTests,
    captureGitInfo,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    // Reporter configuration
    reporter: process.env.CI
      ? [['github'], ['html', { open: 'never' }], ['blob']]
      : [['html', { open: 'on-failure' }]],

    // Global test settings
    use: {
      baseURL,
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },

    // Test timeout
    timeout: 30_000,
    expect: {
      timeout: 5_000,
    },

    projects,

    // Dev server configuration
    webServer: {
      command: webServerCommand,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  };
}
