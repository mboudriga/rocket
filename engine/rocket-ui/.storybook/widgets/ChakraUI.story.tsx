import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Chakra_UI = () => <></>;

export default {
  title: 'Widgets/Chakra UI',
  component: Chakra_UI,
  decorators: [
    () => <WidgetTemplate url="https://www.chakra-ui.com/docs/components/concepts/overview" />,
  ],
};
