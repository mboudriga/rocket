import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Center } from '../Center';
import { Wrap } from './Wrap';
import { WrapExamples } from './Wrap.examples';
import { WrapDefaultProps, type WrapProps } from './Wrap.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Flex container that wraps children to the next line when they overflow.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Tag or badge collections',
    'Filter chip groups',
    'Image thumbnail grids',
    'Skill or keyword lists',
    'Action button groups that wrap',
  ],
  bad: [
    'Fixed-column grid layouts (use Grid)',
    'Single-row horizontal layout (use Flex.H)',
    'Vertical stacking (use Flex.V)',
    'Card grid with equal sizing (use Grid)',
    'Inline text with spacing (use Flex.H)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Wrap> = (args: WrapProps) => <Wrap {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Wrap';

const SquareStyles = {
  height: '40px',
  width: '40px',
  padding: '0 8px',
  borderRadius: 'md',
  background: 'blue.700',
  color: 'white',
};

// Initial story props which override the default
const INITIAL_PROPS: WrapProps = {
  gap: '12px',
  children: [...Array(30).keys()].map((number) => (
    <Center key={number} {...SquareStyles}>
      {number + 1}
    </Center>
  )),
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  align: { control: false },
  direction: { control: false },
  justify: { control: false },
};

// Story constructor
export default {
  title: 'Components/Layout/Wrap',
  component: Wrap,
  args: { ...WrapDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Wrap.test.tsx',
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
        examples={<WrapExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Wrap>;
