import { Docs } from '../../templates';

export const Add_New_Story = () => (
  <Docs.Template title="Add New Story">
    <Docs.Code title="ComponentName.examples.tsx" code={EXAMPLES_CODE}>
      To add a new story you first need an existing component with defined types and default props
      (See: Add New Component). When that is ready, you can copy this template to create your
      'ComponentName.examples.tsx' file. Replace ComponentName with your component's name.
    </Docs.Code>

    <Docs.Code title="ComponentName.story.tsx" language="javascript" code={COMPONENT_TYPES_CODE}>
      Next you can copy this template to create your 'ComponentName.story.tsx' file. Replace
      ComponentName with your component's name and use the appropriate CategoryName. You should now
      be able to see your story in Storybook.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Contribution/Add New Story',
  component: Add_New_Story,
};

const EXAMPLES_CODE = `import { FC } from 'react';
import { Center } from '@rocket/ui';

export const ComponentNameExamples: FC = () => {
  return <Center>Examples coming soon</Center>;
};`;

const COMPONENT_TYPES_CODE = `import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { ComponentName } from './ComponentName';
import { ComponentNameProps, ComponentNameDefaultProps } from './ComponentName.types';
import { ComponentNameExamples } from './ComponentName.examples';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = \`\`;

// [Optional] Alert text, use for important info
const MESSAGE = \`\`;

// [Optional] List the components you pass as notations
const NOTATIONS: string[] = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  bad: [],
  good: [],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof ComponentName> = (args: ComponentNameProps) => (
  <ComponentName {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'ComponentName';

// Initial story props which override the default
const INITIAL_PROPS: ComponentNameProps = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
// Note: 'ref' and 'recipe' are globally hidden in preview.tsx argTypes
export default {
  title: 'Components/CategoryName/ComponentName',
  component: ComponentName,
  args: { ...ComponentNameDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'ComponentName.test.tsx',
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
        examples={<ComponentNameExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof ComponentName>;`;
