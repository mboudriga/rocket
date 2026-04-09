import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { type FC, useEffect, useState } from 'react';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { ShikiHighlighter } from 'react-shiki';
import { Box, type BoxProps, Icon, type IconProps, type StyleProps } from '../../src';
import { rocketCodeDark, rocketCodeLight } from '../themes';

const shikiTransformers = [
  transformerNotationDiff(),
  transformerNotationHighlight(),
  transformerNotationFocus(),
];

export interface CodeBlockProps extends BoxProps {
  /** The code on which syntax highlighting will be applied */
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
  showLineNumbers = false,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    if (isCopied) {
      const copyTimer = setTimeout(() => setIsCopied(false), 1500);

      return () => {
        clearTimeout(copyTimer);
      };
    }
  }, [isCopied]);

  return (
    <Box {...CodeStyles} {...props}>
      <Icon
        as={isCopied ? LuCopyCheck : LuCopy}
        color={isCopied ? 'green.fg' : 'fg.muted'}
        onClick={handleCopy}
        {...IconStyles}
      />
      <ShikiHighlighter
        language={language}
        theme={{ light: rocketCodeLight, dark: rocketCodeDark }}
        defaultColor={false}
        transformers={shikiTransformers}
        showLineNumbers={showLineNumbers}
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
  },
};

const IconStyles: IconProps = {
  fontSize: '20px',
  position: 'absolute',
  top: '18px',
  right: 4,
  zIndex: 1,
  _hover: {
    cursor: 'pointer',
  },
};
