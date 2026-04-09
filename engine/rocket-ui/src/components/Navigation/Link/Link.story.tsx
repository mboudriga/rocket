import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Link } from './Link';
import { LinkExamples } from './Link.examples';
import { LinkDefaultProps, type LinkProps } from './Link.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Anchor element for navigation with external link support.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = ['Box'];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Inline text navigation',
    'External resource references',
    'Breadcrumb navigation items',
    'Footer site links',
    'Help or documentation links',
  ],
  bad: [
    'Action triggers (use Button)',
    'Form submissions (use Button)',
    'Dropdown navigation (use Menu)',
    'Tab navigation (use Tabs)',
    'Styled button-like navigation (use Button)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Link> = (args: LinkProps) => <Link {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Link';

// Initial story props which override the default
const INITIAL_PROPS: LinkProps = {
  href: '#',
  children: 'Link',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  href: { control: false },
};

// Story constructor
export default {
  title: 'Components/Navigation/Link',
  component: Link,
  args: { ...LinkDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Link.test.tsx',
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
        examples={<LinkExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Link>;
