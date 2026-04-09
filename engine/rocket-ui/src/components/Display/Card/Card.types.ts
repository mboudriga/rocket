import type { CardRootProps } from '@chakra-ui/react';
import type { ButtonProps } from '@components/Form/Button';
import type { ReactNode } from 'react';

export interface CardProps extends CardRootProps {
  /** Card title displayed in the header */
  title?: string;
  /** Card description displayed below the title */
  description?: string;
  /** Content to render inside the card body */
  children?: ReactNode;
  /** Action buttons rendered in the card footer (like Dialog) */
  buttons?: Array<ButtonProps>;
  /** Custom footer content (alternative to buttons) */
  footer?: ReactNode;
  /** Visual style variant */
  variant?: 'elevated' | 'outline' | 'subtle';
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
}

export const CardDefaultProps: CardProps = {
  variant: 'outline',
  size: 'md',
  width: '100%',
};
