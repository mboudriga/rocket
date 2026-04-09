import type { FC } from 'react';
import { Box, type BoxProps, type StyleProps, Text } from '../../../src';

import { CodeBlock } from '../CodeBlock';
import { DocsCard } from './DocsCard';

export interface DocsCodeProps extends BoxProps {
  title?: string;
  code: string;
  language?: string;
}

export const DocsCode: FC<DocsCodeProps> = ({ children, title, code, language, ...props }) => {
  return (
    <Box {...CodeStyles} {...props}>
      <DocsCard title={title} {...CardStyles}>
        <Text>{children}</Text>
      </DocsCard>
      <CodeBlock {...{ code, language }} />
    </Box>
  );
};

const CodeStyles: StyleProps = {
  boxShadow: 'sm',
  borderRadius: 'md',
  overflow: 'hidden',
  css: {
    '& pre': {
      borderTopLeftRadius: 'none !important',
      borderTopRightRadius: 'none !important',
    },
  },
};

const CardStyles: StyleProps = {
  bg: { base: '#f0eeec', _dark: '#2a2928' },
  borderBottomLeftRadius: 'none',
  borderBottomRightRadius: 'none',
};
