import type { FC } from 'react';
import { Alert, Box, type BoxProps } from '../../../src';

import { StoryTemplateBody } from './StoryTemplateBody';
import { StoryTemplateDocs } from './StoryTemplateDocs';
import { StoryTemplateExamples } from './StoryTemplateExamples';
import { StoryTemplateHeader } from './StoryTemplateHeader';
import type { StoryTemplateUseProps } from './StoryTemplateUse';

interface StoryTemplateProps {
  children: React.ReactNode;
  meta: any;
  layout?: 'normal' | 'tall' | 'wide' | 'full';
  message?: string;
  description: string;
  notations?: Array<string>;
  use?: StoryTemplateUseProps;
  examples?: React.ReactNode;
}

export const StoryTemplate: FC<StoryTemplateProps> = ({
  children,
  meta,
  layout = 'normal',
  message,
  description,
  notations,
  use,
  examples,
}) => {
  const [category, name] = meta?.title?.split('/').slice(1) ?? [];
  const fileName = meta?.parameters?.fileName?.substring(1).replace('.story', '');
  const { args, initialArgs, argTypes } = meta;

  return (
    <Box {...ContentStyles}>
      <StoryTemplateHeader {...{ name, fileName }} />

      <StoryTemplateBody
        component={children}
        marginTop={10}
        {...{ layout, name, args, initialArgs, argTypes }}
      />

      {message && <Alert marginTop={5}>{message}</Alert>}

      <StoryTemplateDocs marginTop={10} {...{ category, description, notations, use }} />

      <StoryTemplateExamples examples={examples} marginTop={10} />
    </Box>
  );
};

const ContentStyles: BoxProps = {
  minHeight: '100vh',
  width: '100%',
  padding: 5,
  color: 'fg',
  bg: { base: 'white', _dark: '#252423' },
};
