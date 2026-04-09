import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Icons = () => <></>;

export default {
  title: 'Widgets/Icons',
  component: Icons,
  decorators: [() => <WidgetTemplate url="https://react-icons.github.io/react-icons" />],
};
