import { BREAKPOINT_VALUES } from '../../../src';

import { Docs } from '../../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Using_Breakpoints = () => (
  <Docs.Template title="Using Breakpoints">
    <Docs.Code title="Responsive Styles" code={BREAKPOINT_CODE}>
      To use responsive styles, pass a breakpoint object as the style prop value. The available
      breakpoint keys are:
      <Docs.List
        marginTop="20px"
        items={Object.entries(BREAKPOINT_VALUES).map(([key, value]) => ({
          title: key,
          description: `${value}`,
        }))}
      />
    </Docs.Code>

    <Docs.Code title="Flex Example" code={FLEX_BREAKPOINT_CODE}>
      Here's an example using a Flex. This will appear as a column starting from 0px and as a row
      from tabletLG and above.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Usage/Using Breakpoints',
  component: Using_Breakpoints,
};

const BREAKPOINT_CODE = `import { Box, StyleProps } from '@rocket/ui';

<Box {...BoxStyles} />;

const BoxStyles: StyleProps = {
  width: {
    base: '100%',     // 0px to desktop
    desktop: '50%',   // desktop to desktopLG
    desktopLG: '25%', // desktopLG+
  },
};`;

const FLEX_BREAKPOINT_CODE = `import { Flex, StyleProps } from '@rocket/ui';

<Flex {...FlexStyles}>
    <Box>Element 1</Box>
    <Box>Element 2</Box>
</Flex>

const FlexStyles: StyleProps = {
  flexDirection: { base: 'column', tabletLG: 'row' },
};
`;
