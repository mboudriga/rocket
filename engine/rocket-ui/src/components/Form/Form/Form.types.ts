import type { BoxProps } from '@chakra-ui/react';
import type { FormEvent } from 'react';

export interface FormProps extends BoxProps {
  id: string;
  onSubmit?: (event: FormEvent) => void;
}

export const FormDefaultProps: Omit<FormProps, 'id'> = {};
