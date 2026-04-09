import type { ColorPalette, TagRootProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface TagProps extends TagRootProps {
  colorPalette?: ColorPalette;
  variant?: 'subtle' | 'solid' | 'outline' | 'surface';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** If present, an icon will be shown before the button's label */
  leftIcon?: ReactNode;
  /** If present, an icon will be shown after the button's label */
  rightIcon?: ReactNode;
  /** Passing a function will make the close button appear; clicking the button will call
   * the passed function */
  onClose?: () => void;
}

export const TagDefaultProps: TagProps = {
  colorPalette: 'blue',
  variant: 'surface',
  size: 'md',
};
