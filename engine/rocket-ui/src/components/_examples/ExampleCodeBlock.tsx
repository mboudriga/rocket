import { type FC, useEffect, useState } from 'react';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { ShikiHighlighter } from 'react-shiki';
import { Box, Icon, type StyleProps } from '../../index';
import { rocketCodeDark, rocketCodeLight } from '@storybook-themes';

interface ExampleCodeBlockProps {
  code: string;
}

export const ExampleCodeBlock: FC<ExampleCodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <Box {...CodeStyles}>
      <Icon
        as={isCopied ? LuCopyCheck : LuCopy}
        color={isCopied ? 'green.fg' : 'fg.muted'}
        onClick={handleCopy}
        fontSize="18px"
        position="absolute"
        top="14px"
        right="4"
        zIndex={1}
        cursor="pointer"
      />
      <ShikiHighlighter
        language="tsx"
        theme={{ light: rocketCodeLight, dark: rocketCodeDark }}
        defaultColor={false}
        showLanguage={false}
        addDefaultStyles={false}
      >
        {code}
      </ShikiHighlighter>
    </Box>
  );
};

const CodeStyles: StyleProps = {
  position: 'relative',
  css: {
    '& pre': { margin: '0 !important', borderRadius: 'md' },
    '& code': { fontSize: '13px' },
  },
};
