import { Box } from '@components/Layout/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type FC, useRef } from 'react';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Portal } from './Portal';
import { PortalExamples } from './Portal.examples';
import { PortalDefaultProps, type PortalProps } from './Portal.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Renders children into a different DOM node outside the parent tree.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Most overlay components use Portal internally. Only use directly for custom overlays.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Custom overlay implementations',
    'Fixed-position floating elements',
    'Toast or notification containers',
    'Full-screen modals outside layout',
    'Rendering outside scroll containers',
  ],
  bad: [
    'Standard overlays (use Dialog, Drawer, Menu)',
    'Tooltips (use Tooltip)',
    'Normal layout content (use Box)',
    'Popovers (use Popover)',
    'Z-index issues (fix with proper token usage)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Portal> = (args: PortalProps) => (
  <PortalConstructor {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Portal';

// Initial story props which override the default
const INITIAL_PROPS = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  children: { control: false },
  container: { control: false },
};

// Story constructor
export default {
  title: 'Components/Overlay/Portal',
  component: Portal,
  args: { ...PortalDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Portal.test.tsx',
      testResults: vitestResults,
    },
  },
  decorators: [
    (story, meta) => (
      <StoryTemplate
        meta={meta}
        layout={LAYOUT}
        description={DESCRIPTION}
        message={MESSAGE}
        notations={NOTATIONS}
        use={USE}
        examples={<PortalExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Portal>;

/* --- [ CUSTOM RENDERING ] --- */

const PortalConstructor: FC<PortalProps> = ({ ...args }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={containerRef}
      minHeight="80px"
      width="100%"
      padding={5}
      bg="teal.subtle"
      color="fg"
      borderRadius="md"
    >
      <Portal container={containerRef} {...args}>
        This text is being injected through a Portal.
      </Portal>
    </Box>
  );
};
