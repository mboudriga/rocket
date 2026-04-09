import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { QRCode } from './QRCode';
import { QRCodeExamples } from './QRCode.examples';
import { QRCodeDefaultProps, type QRCodeProps } from './QRCode.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Generates a QR code image from a string value.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Share URLs via mobile scan',
    'Payment or invoice links',
    'WiFi network credentials',
    'Event ticket verification',
    'Contact card (vCard) sharing',
  ],
  bad: [
    'Regular link display (use Link)',
    'Short text display (use Text)',
    'Image display (use Image)',
    'Barcode generation (use dedicated library)',
    'Interactive content (use Button or Link)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof QRCode> = (args: QRCodeProps) => <QRCode {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'QRCode';

// Initial story props which override the default
const INITIAL_PROPS: QRCodeProps = {
  value: 'https://example.com',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Display/QRCode',
  component: QRCode,
  args: { ...QRCodeDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'QRCode.test.tsx',
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
        examples={<QRCodeExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof QRCode>;
