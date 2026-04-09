import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { FileUpload } from './FileUpload';
import { FileUploadExamples } from './FileUpload.examples';
import { FileUploadDefaultProps, type FileUploadProps } from './FileUpload.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `File input with drag-and-drop support and file type filtering.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Profile picture uploads',
    'Document attachment in forms',
    'Bulk file imports',
    'Image gallery uploads',
    'CSV or data file imports',
  ],
  bad: [
    'Text content entry (use Textarea)',
    'URL-based image loading (use Input)',
    'Clipboard paste content (use RichTextEditor)',
    'Camera capture (use native input with capture)',
    'Inline image embedding (use RichTextEditor)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof FileUpload> = (args: FileUploadProps) => (
  <FileUpload {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'FileUpload';

// Initial story props which override the default
const INITIAL_PROPS: FileUploadProps = {
  label: 'Upload files',
  maxFiles: 5,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/FileUpload',
  component: FileUpload,
  args: { ...FileUploadDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'FileUpload.test.tsx',
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
        examples={<FileUploadExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof FileUpload>;
