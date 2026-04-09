import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement, ReactNode } from 'react';
import { axe } from 'vitest-axe';
import { RocketProvider } from '../provider/RocketProvider';

function AllProviders({ children }: { children: ReactNode }) {
  return <RocketProvider toast={false}>{children}</RocketProvider>;
}

export interface CustomRenderResult extends RenderResult {
  user: ReturnType<typeof userEvent.setup>;
}

function customRender(
  ui: ReactElement<any>,
  options?: Omit<RenderOptions, 'wrapper'>
): CustomRenderResult {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
}

export * from '@testing-library/react';
export { axe, customRender as render, userEvent };
