import { Text } from '@components/Typography/Text';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Box } from '../Box';
import { ScrollArea } from './ScrollArea';
import { ScrollAreaExamples } from './ScrollArea.examples';
import { ScrollAreaDefaultProps, type ScrollAreaProps } from './ScrollArea.types';

/* --- [ DOCUMENTATION ] --- */

const DESCRIPTION = `Scrollable container with a max height constraint.`;

const MESSAGE = ``;

const NOTATIONS: Array<string> = [];

const USE = {
  good: [
    'Long lists inside fixed-height panels',
    'Chat message containers',
    'Sidebar navigation with many items',
    'Dropdown menu content overflow',
    'Code preview panels',
  ],
  bad: [
    'Full-page scrolling (use native body scroll)',
    'Horizontal carousels (use Carousel)',
    'Resizable panels (use Splitter)',
    'Infinite scroll lists (handle at page level)',
    'Tabbed content switching (use Tabs)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

const LAYOUT = 'tall';

export const Component: StoryObj<typeof ScrollArea> = (args: ScrollAreaProps) => (
  <ScrollAreaConstructor {...args} />
);

Component.storyName = 'ScrollArea';

const INITIAL_PROPS = {
  maxHeight: '200px',
};

const DISABLED_PROPS = {
  children: { control: false },
};

export default {
  title: 'Components/Layout/ScrollArea',
  component: ScrollArea,
  args: { ...ScrollAreaDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'ScrollArea.test.tsx',
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
        examples={<ScrollAreaExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof ScrollArea>;

/* --- [ CUSTOM RENDERING ] --- */

const LoremContent = () => (
  <>
    {Array.from({ length: 20 }, (_, i) => (
      <Text key={i} marginBottom="2">
        {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </Text>
    ))}
  </>
);

const ScrollAreaConstructor: FC<ScrollAreaProps> = ({ ...args }) => {
  return (
    <Box border="1px solid" borderColor="gray.200" borderRadius="md" padding="4" bg="bg">
      <ScrollArea aria-label="Demo content" paddingEnd="5" {...args}>
        <LoremContent />
      </ScrollArea>
    </Box>
  );
};
