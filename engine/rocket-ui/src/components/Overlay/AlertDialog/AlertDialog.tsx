import { Dialog as ChakraDialog, CloseButton, Portal } from '@chakra-ui/react';
import { Button } from '@components/Form/Button';
import { useId, useMemo } from 'react';

import type { AlertDialogProps } from './AlertDialog.types';

const AlertDialog = ({
  ref,
  children,
  title,
  buttons,
  onClose,
  onOpenChange,
  ...props
}: AlertDialogProps & {
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

  const handleOpenChange = (details: { open: boolean }) => {
    onOpenChange?.(details);
    if (!details.open) {
      onClose?.();
    }
  };

  return (
    <ChakraDialog.Root
      role="alertdialog"
      closeOnInteractOutside={false}
      {...props}
      onOpenChange={handleOpenChange}
    >
      <Portal>
        <ChakraDialog.Backdrop css={{ zIndex: 'overlay' }} style={{ zIndex: 1300 }} />
        <ChakraDialog.Positioner css={{ zIndex: 'modal' }} style={{ zIndex: 1400 }}>
          <ChakraDialog.Content ref={ref}>
            <ChakraDialog.Header>
              {title && <ChakraDialog.Title>{title}</ChakraDialog.Title>}
            </ChakraDialog.Header>

            <ChakraDialog.Body>{children}</ChakraDialog.Body>

            {!!buttons?.length && <ChakraDialog.Footer>{actionButtons}</ChakraDialog.Footer>}

            <ChakraDialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </ChakraDialog.CloseTrigger>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.Root>
  );
};

export { AlertDialog };
