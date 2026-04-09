import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Turborepo = () => <></>;

export default {
  title: 'Widgets/Turborepo',
  component: Turborepo,
  decorators: [() => <WidgetTemplate url="https://turborepo.dev/docs" />],
};
