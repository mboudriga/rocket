import { Box } from '@components/Layout/Box';
import { Link } from '@components/Navigation/Link';
import { Text } from '@components/Typography/Text';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { HoverCard } from './HoverCard';
import { HoverCardExamples } from './HoverCard.examples';
import { HoverCardDefaultProps, type HoverCardProps } from './HoverCard.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Rich hover panel for previewing linked content like user profiles.`;

// [Optional] Alert text, use for important info
const MESSAGE = `For simple text hints, use Tooltip instead. HoverCard is for rich preview content.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'User profile preview cards',
    'Link content previews',
    'Product hover previews',
    'Repository or project summaries',
    'Contact information cards',
  ],
  bad: [
    'Simple text hints (use Tooltip)',
    'Interactive forms (use Popover)',
    'Action menus (use Menu)',
    'Permanent content display (use Card)',
    'Mobile-first interfaces (no hover)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof HoverCard> = (args: HoverCardProps) => (
  <HoverCard {...args} trigger={<Link>Hover over me</Link>}>
    <Box p="4">
      <Text fontWeight="bold">Card Title</Text>
      <Text>This content appears when you hover over the trigger.</Text>
    </Box>
  </HoverCard>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'HoverCard';

// Initial story props which override the default
const INITIAL_PROPS: HoverCardProps = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Overlay/HoverCard',
  component: HoverCard,
  args: { ...HoverCardDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'HoverCard.test.tsx',
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
        examples={<HoverCardExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof HoverCard>;
