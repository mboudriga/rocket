import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Card } from './Card';
import { CardExamples } from './Card.examples';
import { CardDefaultProps, type CardProps } from './Card.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Content container with optional header, body, and footer sections.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Content previews in grids',
    'Feature or pricing cards',
    'User profile summary cards',
    'Dashboard metric panels',
    'Form or settings section containers',
  ],
  bad: [
    'Simple text grouping (use Box)',
    'Full page layout (use Flex)',
    'Collapsible content (use Accordion)',
    'Overlay content (use Dialog)',
    'Navigation containers (use Flex)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Card> = (args: CardProps) => <Card {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Card';

// Initial story props which override the default
const INITIAL_PROPS: CardProps = {
  title: 'Hello human!',
  description: 'I come bearing gifts of UI components.',
  variant: 'outline',
  size: 'md',
  children: <>{'I come in peace '}&#9996;</>,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  buttons: { control: false },
  footer: { control: false },
};

// Story constructor
export default {
  title: 'Components/Display/Card',
  component: Card,
  args: { ...CardDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Card.test.tsx',
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
        examples={<CardExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Card>;
