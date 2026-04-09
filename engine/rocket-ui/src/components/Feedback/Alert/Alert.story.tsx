import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Alert } from './Alert';
import { AlertExamples } from './Alert.examples';
import { AlertDefaultProps, type AlertProps } from './Alert.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Inline notification banner for contextual messages and warnings.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Form validation error summaries',
    'Success confirmation messages',
    'Warning banners for user attention',
    'Informational notices',
    'System status messages',
  ],
  bad: [
    'Transient notifications (use toast)',
    'Confirmation prompts (use AlertDialog)',
    'Inline field errors (use Input error prop)',
    'Loading states (use Spinner or Skeleton)',
    'Empty content messaging (use EmptyState)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Alert> = (args: AlertProps) => <Alert {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Alert';

// Initial story props which override the default
const INITIAL_PROPS: AlertProps = {
  title: 'Hey you!',
  children: 'Try changing my status, I have quite a few...',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Feedback/Alert',
  component: Alert,
  args: { ...AlertDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Alert.test.tsx',
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
        examples={<AlertExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Alert>;
