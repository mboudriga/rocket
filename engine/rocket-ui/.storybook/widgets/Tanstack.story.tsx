import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Tanstack = () => <></>;

export default {
  title: 'Widgets/Tanstack',
  component: Tanstack,
  decorators: [() => <WidgetTemplate url="https://tanstack.com/" />],
};
