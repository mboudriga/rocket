import { type FC, useMemo } from 'react';
import { Flex } from '../../../src';
import { CodeBlock } from '../CodeBlock';
import { generateJsx } from './utils/generateJsx';

interface StoryTemplateCodeProps {
  name: string;
  args: Record<string, unknown>;
  initialArgs: Record<string, unknown>;
  argTypes?: Record<string, any>;
}

export const StoryTemplateCode: FC<StoryTemplateCodeProps> = ({
  name,
  args,
  initialArgs,
  argTypes,
}) => {
  const code = useMemo(
    () => generateJsx(name, args, initialArgs, argTypes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, initialArgs, argTypes, args]
  );

  return (
    <Flex.V
      width="100%"
      height="100%"
      padding={0}
      css={{
        '& pre': {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <CodeBlock code={code} width="100%" flex="1" />
    </Flex.V>
  );
};
