import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Ark_UI = () => <></>;

export default {
  title: 'Widgets/Ark UI',
  component: Ark_UI,
  decorators: [() => <WidgetTemplate url="https://ark-ui.com/docs/overview/about" />],
};
