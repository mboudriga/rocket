import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Playwright = () => <></>;

export default {
  title: 'Widgets/Playwright',
  component: Playwright,
  decorators: [() => <WidgetTemplate url="https://playwright.dev/docs/writing-tests" />],
};