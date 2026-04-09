import { Docs } from '../../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Using_Flex = () => (
  <Docs.Template title="Using Flex">
    <Docs.Code title="Flex" code={FLEX_CODE}>
      If the elements will change orientation dynamically use the regular Flex.
    </Docs.Code>

    <Docs.Code title="Flex.V" code={FLEX_V_CODE}>
      If the elements will always be positioned vertically use Flex.V.
    </Docs.Code>

    <Docs.Code title="Flex.H" code={FLEX_H_CODE}>
      If the elements will always be positioned horizontally use Flex.H.
    </Docs.Code>

    <Docs.Code title="Distributing Space" code={FLEX_DISTRIBUTE_CODE}>
      Use justify="space-between" to push items to opposite ends, or marginLeft="auto" on a single
      item to push it to the right.
    </Docs.Code>

    <Docs.Code title="as Prop (Semantic HTML)" code={FLEX_AS_CODE}>
      Flex, Flex.V, and Flex.H accept the polymorphic as prop to render semantic HTML elements
      instead of div. Use this for landmarks like nav, header, section, and ul.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Usage/Using Flex',
  component: Using_Flex,
};

const FLEX_CODE = `import { Flex } from '@rocket/ui';

<Flex flexDirection={condition ? 'row' : 'column'}>
    <>Element 1</>
    <>Element 2</>
</Flex>`;

const FLEX_V_CODE = `import { Flex } from '@rocket/ui';

<Flex.V>
    <>Element 1</>
    <>Element 2</>
</Flex.V>`;

const FLEX_H_CODE = `import { Flex } from '@rocket/ui';

<Flex.H>
    <>Element 1</>
    <>Element 2</>
</Flex.H>`;

const FLEX_DISTRIBUTE_CODE = `import { Flex, Box } from '@rocket/ui';

// Push items apart
<Flex.H justify="space-between">
    <>Logo</>
    <>Sign In</>
</Flex.H>

// Push one item to the right
<Flex.H gap="2">
    <>Item 1</>
    <>Item 2</>
    <Box marginLeft="auto">Right-aligned</Box>
</Flex.H>`;

const FLEX_AS_CODE = `import { Flex, Box } from '@rocket/ui';

// Navigation
<Flex.H as="nav" gap="4">
    <>Home</>
    <>About</>
    <>Contact</>
</Flex.H>

// Page header
<Flex.H as="header" justify="space-between" align="center">
    <>App Name</>
    <>Settings</>
</Flex.H>

// Content section
<Flex.V as="section" gap="4">
    <>Section Title</>
    <>Section content</>
</Flex.V>

// List
<Flex.V as="ul" gap="1">
    <Box as="li">Item 1</Box>
    <Box as="li">Item 2</Box>
</Flex.V>`;
