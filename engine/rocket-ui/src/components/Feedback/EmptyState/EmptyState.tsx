import { EmptyState as ChakraEmptyState } from '@chakra-ui/react';

import type { EmptyStateProps } from './EmptyState.types';

const EmptyState = ({
  ref,
  icon,
  title,
  description,
  children,
  ...props
}: EmptyStateProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraEmptyState.Root ref={ref} {...props}>
      <ChakraEmptyState.Content>
        {icon && <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>}
        {title && <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>}
        {description && <ChakraEmptyState.Description>{description}</ChakraEmptyState.Description>}
        {children}
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  );
};

export { EmptyState };
