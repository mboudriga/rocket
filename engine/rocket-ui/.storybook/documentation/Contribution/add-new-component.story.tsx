import { Docs } from '../../templates';

export const Add_New_Component = () => (
  <Docs.Template title="Add New Component">
    <Docs.Code title="ComponentName.types.ts" code={COMPONENT_TYPES_CODE}>
      First you will need to create your 'ComponentName.types.ts' file in a new folder under the
      proper category. Extend the Chakra type that best matches your component (BoxProps is the
      go-to default). Replace ComponentName with your component's name.
    </Docs.Code>

    <Docs.Code title="ComponentName.tsx" code={COMPONENT_CODE}>
      Next you need to create a new 'ComponentName.tsx' file by copying this template and replacing
      ComponentName with your component's name. We pass ref as a regular prop (React 19 pattern) and
      use destructured defaults from DefaultProps. You are now ready to add your component's
      implementation.
    </Docs.Code>

    <Docs.Code title="index.ts" code={INDEX_CODE}>
      Create an index.ts barrel export to re-export your component and its types. This keeps imports
      clean for consumers.
    </Docs.Code>

    <Docs.Code title="File Structure" code={FILE_STRUCTURE}>
      Every component folder should contain these 6 files. This structure keeps implementation,
      types, tests, stories, and examples co-located for easy discovery and maintenance.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Contribution/Add New Component',
  component: Add_New_Component,
};

const COMPONENT_TYPES_CODE = `import type { BoxProps } from '@chakra-ui/react';

export interface ComponentNameProps extends BoxProps {}

export const ComponentNameDefaultProps: ComponentNameProps = {};`;

const COMPONENT_CODE = `import { Box } from '@chakra-ui/react';

import type { StyleProps } from '../../../types';
import { ComponentNameDefaultProps, type ComponentNameProps } from './ComponentName.types';

const ComponentName = ({
  ref,
  ...props
}: ComponentNameProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <Box ref={ref} {...ComponentNameStyles} {...props}>
      New Component
    </Box>
  );
};

const ComponentNameStyles: StyleProps = {};

export { ComponentName };`;

const INDEX_CODE = `export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';`;

const FILE_STRUCTURE = `ComponentName/
├── ComponentName.tsx           # Component implementation
├── ComponentName.types.ts      # Props interface and default props
├── ComponentName.test.tsx      # Unit tests (Vitest)
├── ComponentName.story.tsx     # Storybook story
├── ComponentName.examples.tsx  # Usage examples
└── index.ts                    # Barrel export`;
