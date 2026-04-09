import { WidgetTemplate } from '../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Zustand = () => <></>;

export default {
  title: 'Widgets/Zustand',
  component: Zustand,
  decorators: [() => <WidgetTemplate url="https://zustand.docs.pmnd.rs/learn/getting-started/introduction" />],
};
