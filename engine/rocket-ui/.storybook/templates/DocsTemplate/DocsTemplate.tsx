import type { FC } from 'react';
import { Box, type BoxProps, Flex, Heading } from '../../../src';

import { DocsCard } from './DocsCard';
import { DocsCode } from './DocsCode';
import { DocsList } from './DocsList';

export interface DocsTemplateProps extends BoxProps {
  title: string;
}

const DocsTemplate: FC<DocsTemplateProps> = ({ children, title, ...props }) => {
  return (
    <Box {...ContentStyles} {...props}>
      <Flex.V padding={10} gap={5}>
        <Heading size="3xl" marginBottom={5}>
          {title}
        </Heading>
        {children}
      </Flex.V>
    </Box>
  );
};

const ContentStyles: BoxProps = {
  height: '100vh',
  width: '100%',
  overflowY: 'auto',
  color: 'fg',
  bg: { base: 'white', _dark: '#252423' },
};

const Docs = Object.assign(
  {},
  { Template: DocsTemplate, Card: DocsCard, Code: DocsCode, List: DocsList }
);

export { Docs };
