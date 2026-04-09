import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Motion = () => <></>;

export default {
  title: 'Widgets/Motion',
  component: Motion,
  decorators: [() => <WidgetTemplate url="https://motion.dev/docs/react-animation" />],
};
