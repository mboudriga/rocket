import { Group, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import type { StyleProps } from '../../../types';
import { popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import { PasswordInputDefaultProps, type PasswordInputProps } from './PasswordInput.types';

const PasswordInput = ({
  ref,
  variant = PasswordInputDefaultProps.variant,
  ...props
}: PasswordInputProps & {
  ref?: React.Ref<HTMLInputElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const [visible, setVisible] = useState(false);
  const styles = variant === 'flushed' ? FlushedStyles : PasswordInputStyles;

  return (
    <FieldWrapper {...poppedProps}>
      <Group attached width="100%">
        <Input
          ref={ref}
          variant={variant}
          type={visible ? 'text' : 'password'}
          {...styles}
          {...otherProps}
        />
        <IconButton
          variant="outline"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <LuEyeOff /> : <LuEye />}
        </IconButton>
      </Group>
    </FieldWrapper>
  );
};

const PasswordInputStyles: StyleProps = {
  borderColor: { base: 'gray.300', _dark: 'gray.600' },
  bg: { base: 'white', _dark: 'gray.800' },
};

const FlushedStyles: StyleProps = {
  borderColor: { base: 'gray.300', _dark: 'gray.600' },
};

export { PasswordInput };
