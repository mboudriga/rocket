import type { FC } from 'react';
import { LuBookOpen } from 'react-icons/lu';
import { Card, Flex, type FlexProps } from '../../../src';

import { StoryTemplateTitle } from './StoryTemplateTitle';

interface StoryTemplateExamplesProps extends FlexProps {
  examples?: React.ReactNode;
}

export const StoryTemplateExamples: FC<StoryTemplateExamplesProps> = ({ examples, ...props }) => {
  return (
    <Flex.V gap={5} {...props}>
      <StoryTemplateTitle title="Examples" icon={LuBookOpen} />
      <Card bg={{ base: 'bg', _dark: '#252423' }} boxShadow="sm">
        {examples}
      </Card>
    </Flex.V>
  );
};
