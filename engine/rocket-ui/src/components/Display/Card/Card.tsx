import { Card as ChakraCard } from '@chakra-ui/react';
import { Button } from '@components/Form/Button';
import { useId, useMemo } from 'react';

import type { CardProps } from './Card.types';

const Card = ({
  ref,
  children,
  title,
  description,
  buttons,
  footer,
  ...props
}: CardProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const baseId = useId();
  const actionButtons = useMemo(
    () =>
      buttons?.map((buttonProps, index) => (
        <Button key={`${baseId}-${index}`} {...buttonProps} />
      )) || null,
    [buttons, baseId]
  );

  const hasHeader = !!title || !!description;
  const hasFooter = !!buttons?.length || !!footer;

  return (
    <ChakraCard.Root ref={ref} {...props}>
      {hasHeader && (
        <ChakraCard.Header>
          {title && <ChakraCard.Title>{title}</ChakraCard.Title>}
          {description && <ChakraCard.Description>{description}</ChakraCard.Description>}
        </ChakraCard.Header>
      )}

      {children && <ChakraCard.Body>{children}</ChakraCard.Body>}

      {hasFooter && (
        <ChakraCard.Footer>{buttons?.length ? actionButtons : footer}</ChakraCard.Footer>
      )}
    </ChakraCard.Root>
  );
};

export { Card };
