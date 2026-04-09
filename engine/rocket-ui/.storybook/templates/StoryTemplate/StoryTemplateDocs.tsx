import { type FC, useMemo } from 'react';
import { LuFileText } from 'react-icons/lu';
import { Card, Flex, type FlexProps, type StyleProps, Tag, Text, Wrap } from '../../../src';

import { StoryTemplateCategory } from './StoryTemplateCategory';
import { StoryTemplateTitle } from './StoryTemplateTitle';
import { StoryTemplateUse, type StoryTemplateUseProps } from './StoryTemplateUse';

interface StoryTemplateDocsProps extends FlexProps {
  category: string;
  description?: string;
  notations?: Array<string>;
  use?: StoryTemplateUseProps;
}

export const StoryTemplateDocs: FC<StoryTemplateDocsProps> = ({
  category,
  description,
  notations,
  use,
  ...props
}) => {
  const { good, bad } = { ...use };
  // Don't show unless theres at least one of each
  const isUseDefined = Boolean(good?.length && bad?.length);
  const hasNotations = Boolean(notations?.length);

  const notationBadges = useMemo(
    () =>
      notations?.map((notation) => (
        <Tag key={notation} userSelect="text">
          {notation}
        </Tag>
      )) || null,
    [notations]
  );

  return (
    <Flex.V gap={5} {...props}>
      <StoryTemplateTitle title="Docs" icon={LuFileText} />

      <Card {...CardStyles}>
        <StoryTemplateCategory category={category} />
      </Card>

      <Card title="Description" {...CardStyles}>
        <Text marginTop={-1}>{description}</Text>
      </Card>

      {hasNotations && (
        <Card title="Notations" {...CardStyles}>
          <Wrap gap={5}>{notationBadges}</Wrap>
        </Card>
      )}

      {isUseDefined && <StoryTemplateUse {...{ good, bad }} />}
    </Flex.V>
  );
};

const CardStyles: StyleProps = {
  boxShadow: 'sm',
  bg: { base: 'bg', _dark: '#1e1d1c' },
};
