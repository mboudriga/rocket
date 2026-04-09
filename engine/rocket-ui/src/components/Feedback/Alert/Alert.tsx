import { Alert as ChakraAlert, CloseButton } from '@chakra-ui/react';
import type { StyleProps } from '../../../types';

import { AlertDefaultProps, type AlertProps } from './Alert.types';

const Alert = ({
  ref,
  children,
  title,
  variant = AlertDefaultProps.variant,
  onClose,
  ...props
}: AlertProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const AlertStyles: StyleProps = {
    borderRadius: '4px',
    ...(variant === 'outline' && { background: 'bg' }),
  };

  return (
    <ChakraAlert.Root ref={ref} variant={variant} {...AlertStyles} {...props}>
      <ChakraAlert.Indicator />
      <ChakraAlert.Content>
        {title && <ChakraAlert.Title>{title}</ChakraAlert.Title>}
        {children && <ChakraAlert.Description>{children}</ChakraAlert.Description>}
      </ChakraAlert.Content>
      {onClose && <CloseButton pos="relative" top="-2" insetEnd="-2" onClick={onClose} />}
    </ChakraAlert.Root>
  );
};

export { Alert };
