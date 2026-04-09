import { Box } from '@components/Layout/Box';
import type { FormEvent } from 'react';

import type { FormProps } from './Form.types';

const Form = ({
  ref,
  children,
  id,
  onSubmit,
  ...props
}: FormProps & {
  ref?: React.Ref<HTMLFormElement>;
}) => {
  const handleOnSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <Box {...props}>
      <form onSubmit={handleOnSubmit} {...{ ref, id }}>
        {children}
      </form>
    </Box>
  );
};

export { Form };
