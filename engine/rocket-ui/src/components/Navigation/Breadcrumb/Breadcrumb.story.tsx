import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbExamples } from './Breadcrumb.examples';
import { BreadcrumbDefaultProps, type BreadcrumbProps } from './Breadcrumb.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Navigation trail showing the current page's location in a hierarchy.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Multi-level page navigation',
    'File or folder path display',
    'Category hierarchy navigation',
    'E-commerce product paths',
    'Settings section navigation',
  ],
  bad: [
    'Tab-style navigation (use Tabs)',
    'Step-by-step wizard (use Steps)',
    'Dropdown navigation (use Menu)',
    'Pagination (use custom pagination)',
    'Single-level navigation (use Link)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Breadcrumb> = (args: BreadcrumbProps) => (
  <Breadcrumb {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Breadcrumb';

// Initial story props which override the default
const INITIAL_PROPS: BreadcrumbProps = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb', current: true },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  args: { ...BreadcrumbDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Breadcrumb.test.tsx',
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
        examples={<BreadcrumbExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Breadcrumb>;
