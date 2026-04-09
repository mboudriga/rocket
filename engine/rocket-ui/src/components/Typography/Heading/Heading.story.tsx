import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Heading } from './Heading';
import { HeadingExamples } from './Heading.examples';
import { HeadingDefaultProps, type HeadingProps } from './Heading.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Section heading with semantic HTML level and scalable size.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Page titles (h1)',
    'Section headings (h2, h3)',
    'Card titles',
    'Dialog and drawer titles',
    'Form section labels',
  ],
  bad: [
    'Body text paragraphs (use Text)',
    'Inline code (use Code)',
    'Navigation links (use Link)',
    'Status labels (use Badge)',
    'Interactive elements (use Button)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Heading> = (args: HeadingProps) => <Heading {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Heading';

// Initial story props which override the default
const INITIAL_PROPS: HeadingProps = {
  children: "Don't wait, claim 40 tons of packing peanuts today!",
  highlight: {
    query: ['40 tons'],
    styles: { padding: '2px 8px', borderRadius: '8px', background: 'teal.100' },
  },
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Typography/Heading',
  component: Heading,
  args: { ...HeadingDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Heading.test.tsx',
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
        examples={<HeadingExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Heading>;
