import { type FC, useMemo } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { BiHide } from 'react-icons/bi';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { ImSpinner6 } from 'react-icons/im';
import { LuLayers } from 'react-icons/lu';
import { MdOutlineList } from 'react-icons/md';
import { RiImageLine, RiLayoutMasonryLine } from 'react-icons/ri';
import { TbTypography } from 'react-icons/tb';
import { Flex, Icon, type StyleProps, Text } from '../../../src';

interface StoryTemplateCategoryProps {
  category: string;
}

export const StoryTemplateCategory: FC<StoryTemplateCategoryProps> = ({ category, ...props }) => {
  const { icon, description } = useMemo(() => getCategoryMeta(category), [category]);

  return (
    <Flex.H gap={3} {...props}>
      <Icon as={icon} fontSize="20px" />

      <Text {...TextStyles}>{`${category} - ${description}`}</Text>
    </Flex.H>
  );
};

const TextStyles: StyleProps = {
  alignSelf: 'center',
  fontWeight: 500,
  lineHeight: 1,
};

export const getCategoryMeta = (category: string): any => {
  switch (category) {
    case 'Disclosure':
      return { icon: BiHide, description: 'Handle element visibility' };
    case 'Display':
      return { icon: MdOutlineList, description: 'Handle data presentation' };
    case 'Feedback':
      return { icon: ImSpinner6, description: 'Handle site response' };
    case 'Form':
      return { icon: HiOutlineCursorClick, description: 'Handle user interaction' };
    case 'Layout':
      return {
        icon: RiLayoutMasonryLine,
        description: 'Handle element positioning',
      };
    case 'Media':
      return { icon: RiImageLine, description: 'Handle asset display' };
    case 'Navigation':
      return { icon: AiOutlineLink, description: 'Handle page routing' };
    case 'Overlay':
      return { icon: LuLayers, description: 'Handle layering content' };
    case 'Typography':
      return { icon: TbTypography, description: 'Handle display of text' };
    default:
      return { icon: null, description: 'Unknown Category' };
  }
};
