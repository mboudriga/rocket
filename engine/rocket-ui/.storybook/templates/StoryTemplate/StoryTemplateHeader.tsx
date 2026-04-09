import type { FC } from 'react';
import { Button, Flex, Heading, type StyleProps } from '../../../src';

import { CodeBlock } from '../CodeBlock';

interface StoryTemplateHeaderProps {
  name: string;
  fileName: string;
}

export const StoryTemplateHeader: FC<StoryTemplateHeaderProps> = ({ name, fileName }) => {
  const handleSourceClick = () => {
    window.open(
      `https://github.com/mboudriga/rocket/blob/main/engine/rocket-ui${fileName}`,
      '_blank'
    );
  };

  return (
    <Flex.V justifyContent="space-between">
      <Flex.H {...TitleRowStyles}>
        <Heading size="3xl">{`<${name} />`}</Heading>
        <Button colorPalette="blue" onClick={handleSourceClick}>View Source</Button>
      </Flex.H>

      <CodeBlock
        code={`import { ${name}, ${name}Props } from '@rocket/ui';`}
        boxShadow="sm"
        borderRadius="md"
        overflow="hidden"
      />
    </Flex.V>
  );
};

const TitleRowStyles: StyleProps = {
  justifyContent: 'space-between',
  marginBottom: 5,
};
