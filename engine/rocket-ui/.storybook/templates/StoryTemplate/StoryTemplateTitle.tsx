import type { FC } from 'react';
import { Flex, type FlexProps, Icon, type StyleProps, Text } from '../../../src';

interface StoryTemplateTitleProps extends FlexProps {
  title: string;
  icon?: any;
}

export const StoryTemplateTitle: FC<StoryTemplateTitleProps> = ({ title, icon, ...props }) => {
  return (
    <Flex.H {...PanelTitleStyles} {...props}>
      <Icon as={icon} marginRight={2} />
      <Text lineHeight={1}>{title}</Text>
    </Flex.H>
  );
};

const PanelTitleStyles: StyleProps = {
  alignItems: 'center',
  fontWeight: 'medium',
  fontSize: 'xl',
};
