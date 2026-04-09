import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const PNPM = () => <></>;

export default {
  title: 'Widgets/PNPM',
  component: PNPM,
  decorators: [() => <WidgetTemplate url="https://pnpm.io/pnpm-cli" />],
};
