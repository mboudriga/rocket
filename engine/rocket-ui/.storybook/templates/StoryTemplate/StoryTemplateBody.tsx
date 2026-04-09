import type { FC } from 'react';
import { LuCodeXml } from 'react-icons/lu';
import { MdOutlineViewInAr } from 'react-icons/md';
import { Box, Center, Flex, type FlexProps, type StyleProps } from '../../../src';

import { StoryTemplateCode } from './StoryTemplateCode';
import { StoryTemplateTitle } from './StoryTemplateTitle';

interface StoryTemplateBodyProps extends FlexProps {
  component: React.ReactNode;
  layout: string;
  name: string;
  args: any;
  initialArgs: any;
  argTypes?: any;
}

export const StoryTemplateBody: FC<StoryTemplateBodyProps> = ({
  component,
  layout,
  name,
  args,
  initialArgs,
  argTypes,
  ...props
}) => {
  return (
    <Flex {...BodyStyles(layout)} {...props}>
      <Flex.V {...PreviewStyles(layout)}>
        <StoryTemplateTitle title="Preview" icon={MdOutlineViewInAr} />

        <Box {...WindowStyles} padding={5} display="grid" placeContent="center">
          {component}
        </Box>
      </Flex.V>

      <Flex.V {...PanelsStyles(layout)}>
        <StoryTemplateTitle title="Code" icon={LuCodeXml} />

        <Center {...WindowStyles}>
          <StoryTemplateCode {...{ name, args, initialArgs, argTypes }} />
        </Center>
      </Flex.V>
    </Flex>
  );
};

const BodyStyles = (layout: string) => {
  return {
    flexDirection: ['normal', 'tall'].includes(layout)
      ? ({ base: 'column', desktop: 'row' } as const)
      : 'column',
    height: 'fit-content',
    minHeight: '45vh',
    gap: ['normal', 'tall'].includes(layout) ? 5 : 10,
  } as StyleProps;
};

const PreviewStyles = (layout: string) => {
  const previewHeight = layout === '100%' ? '75vh' : layout === 'tall' ? '60vh' : '45vh';
  return {
    width: ['normal', 'tall'].includes(layout)
      ? ({ base: '100%', desktop: '50%' } as const)
      : '100%',
    height: previewHeight,
    minHeight: previewHeight,
    maxHeight: previewHeight,
    gap: 5,
  } as StyleProps;
};

const PanelsStyles = (layout: string) => {
  const panelsHeight = layout === 'tall' ? '60vh' : '45vh';
  return {
    width: ['normal', 'tall'].includes(layout)
      ? ({ base: '100%', desktop: '50%' } as const)
      : '100%',
    height: panelsHeight,
    minHeight: panelsHeight,
    maxHeight: panelsHeight,
    gap: 5,
  } as StyleProps;
};

const WindowStyles: StyleProps = {
  overflow: 'hidden',
  height: '100%',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: 'md',
  bg: { base: '#faf9f8', _dark: '#1e1d1c' },
  boxShadow: 'sm',
};
