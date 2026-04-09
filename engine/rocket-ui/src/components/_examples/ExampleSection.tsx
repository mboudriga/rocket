import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Icon } from '@components/Media/Icon';
import { Text } from '@components/Typography/Text';
import { type FC, type ReactNode, useState } from 'react';
import { LuChevronDown, LuChevronRight, LuCode } from 'react-icons/lu';
import { ExampleCodeBlock } from './ExampleCodeBlock';

interface ExampleSectionProps {
  title: string;
  children: ReactNode;
  /** Injected automatically by vite-plugin-example-source at build time */
  sourceCode?: string;
}

export const ExampleSection: FC<ExampleSectionProps> = ({ title, children, sourceCode }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <Box>
      <Text
        as="h3"
        fontSize="xs"
        fontWeight="semibold"
        color="fg.muted"
        textTransform="uppercase"
        letterSpacing="wider"
        marginBottom="3"
      >
        {title}
      </Text>
      {children}
      {sourceCode && (
        <>
          <Flex.H
            align="center"
            gap="1"
            marginTop="3"
            cursor="pointer"
            color="fg.muted"
            fontSize="xs"
            onClick={() => setShowCode(!showCode)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowCode(!showCode);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={showCode}
            _hover={{ color: 'fg' }}
            transition="color 0.15s"
          >
            <Icon as={showCode ? LuChevronDown : LuChevronRight} fontSize="14px" />
            <Icon as={LuCode} fontSize="14px" />
            <Text fontSize="xs" fontWeight="medium">
              {showCode ? 'Hide Code' : 'Show Code'}
            </Text>
          </Flex.H>
          {showCode && (
            <Box marginTop="2" borderRadius="md" overflow="hidden" boxShadow="sm" bg={{ base: '#faf9f8', _dark: '#1e1d1c' }}>
              <ExampleCodeBlock code={sourceCode} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
