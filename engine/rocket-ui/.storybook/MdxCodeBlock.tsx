import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import type { FC, HTMLAttributes } from 'react';
import { ShikiHighlighter } from 'react-shiki';
import { rocketCodeDark, rocketCodeLight } from './themes';

const shikiTransformers = [
  transformerNotationDiff(),
  transformerNotationHighlight(),
  transformerNotationFocus(),
];

interface MdxCodeBlockProps extends HTMLAttributes<HTMLElement> {
  children?: string;
  className?: string;
}

export const MdxCodeBlock: FC<MdxCodeBlockProps> = ({ children, className, ...props }) => {
  const languageMatch = className?.match(/language-(\w+)/);

  if (!languageMatch) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <ShikiHighlighter
      language={languageMatch[1]}
      theme={{ light: rocketCodeLight, dark: rocketCodeDark }}
      defaultColor={false}
      transformers={shikiTransformers}
      addDefaultStyles={false}
    >
      {String(children).replace(/\n$/, '')}
    </ShikiHighlighter>
  );
};
