import type { PinInputRootProps } from '@chakra-ui/react';

export interface PinInputProps extends Omit<PinInputRootProps, 'onChange'> {
  length?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const PinInputDefaultProps: PinInputProps = { length: 4 };
