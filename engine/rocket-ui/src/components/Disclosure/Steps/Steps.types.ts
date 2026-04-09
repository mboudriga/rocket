import type { StepsRootProps } from '@chakra-ui/react';

export interface StepsItemProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepsProps extends Omit<StepsRootProps, 'onStepChange' | 'onChange'> {
  items?: Array<StepsItemProps>;
  step?: number;
  defaultStep?: number;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'subtle';
  linear?: boolean;
  onChange?: (index: number) => void;
}

export const StepsDefaultProps: StepsProps = {
  defaultStep: 0,
  orientation: 'horizontal',
  size: 'md',
  variant: 'solid',
  linear: false,
};
