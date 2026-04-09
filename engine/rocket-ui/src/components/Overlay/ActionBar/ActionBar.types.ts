import type { ActionBarRootProps } from '@chakra-ui/react';
import type { ButtonProps } from '@components/Form/Button';

export interface ActionBarActionProps extends ButtonProps {
  label: string;
}

export interface ActionBarProps extends Omit<ActionBarRootProps, 'children'> {
  open?: boolean;
  actions?: Array<ActionBarActionProps>;
  selectionText?: string;
  hasCloseTrigger?: boolean;
  onClose?: () => void;
}

export const ActionBarDefaultProps: Partial<ActionBarProps> = {
  open: false,
  hasCloseTrigger: true,
};
