import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Tag } from './Tag';
import { TagExamples } from './Tag.examples';
import { TagDefaultProps, type TagProps } from './Tag.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Removable label for user-created categories, filters, or selections.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Applied filter display',
    'Selected item chips',
    'Categorization labels with removal',
    'Skill or interest tags',
    'Email recipient display',
  ],
  bad: [
    'Non-removable status labels (use Badge)',
    'Interactive buttons (use Button)',
    'Navigation links (use Link)',
    'Tab-like selection (use SegmentedControl)',
    'Input for creating tags (use TagsInput)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Tag> = (args: TagProps) => <Tag {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Tag';

// Initial story props which override the default
const INITIAL_PROPS: TagProps = { children: 'New' };

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  rightIcon: { control: false },
  leftIcon: { control: false },
};

// Story constructor
export default {
  title: 'Components/Display/Tag',
  component: Tag,
  args: { ...TagDefaultProps, ...INITIAL_PROPS, onClose: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Tag.test.tsx',
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
        examples={<TagExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Tag>;
