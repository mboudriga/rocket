import { type FC, useMemo } from 'react';
import { LuCircleCheck, LuCircleX } from 'react-icons/lu';
import { Card, Flex, List, type StyleProps, Text } from '../../../src';

export interface StoryTemplateUseProps {
  good?: Array<string>;
  bad?: Array<string>;
}

export const StoryTemplateUse: FC<StoryTemplateUseProps> = ({ good, bad }) => {
  const goodItems = useMemo(
    () => good?.map((text) => <Text key={text}>{text}</Text>) || null,
    [good]
  );

  const badItems = useMemo(() => bad?.map((text) => <Text key={text}>{text}</Text>) || null, [bad]);

  return (
    <Flex.H {...FlexStyles}>
      <Card title="Good use" {...CardStyles} borderTop="3px solid" borderTopColor="green.fg">
        <List icon={<LuCircleCheck />} iconColor="green.fg">
          {goodItems}
        </List>
      </Card>
      <Card title="Bad use" {...CardStyles} borderTop="3px solid" borderTopColor="red.fg">
        <List icon={<LuCircleX />} iconColor="red.fg">
          {badItems}
        </List>
      </Card>
    </Flex.H>
  );
};

const FlexStyles: StyleProps = {
  height: 'fit-content',
  gap: 5,
  marginTop: 5,
};

const CardStyles: StyleProps = {
  height: 'auto',
  width: '50%',
  bg: { base: '#faf9f8', _dark: '#1e1d1c' },
};
