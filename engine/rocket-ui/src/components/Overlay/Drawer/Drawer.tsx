import { Drawer as ChakraDrawer, CloseButton, Portal } from '@chakra-ui/react';
import { Button } from '@components/Form/Button';
import { useId, useMemo } from 'react';

import { DrawerDefaultProps, type DrawerProps } from './Drawer.types';

const Drawer = ({
  ref,
  children,
  title,
  buttons,
  onClose,
  onOpenChange,
  closeOnInteractOutside = DrawerDefaultProps.closeOnInteractOutside,
  ...props
}: DrawerProps & {
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
    <ChakraDrawer.Root
      closeOnInteractOutside={closeOnInteractOutside}
      {...props}
      onOpenChange={handleOpenChange}
    >
      <Portal>
        <ChakraDrawer.Backdrop />
        <ChakraDrawer.Positioner>
          <ChakraDrawer.Content ref={ref}>
            <ChakraDrawer.Header>
              {title && <ChakraDrawer.Title>{title}</ChakraDrawer.Title>}
            </ChakraDrawer.Header>

            <ChakraDrawer.Body>{children}</ChakraDrawer.Body>

            {!!buttons?.length && <ChakraDrawer.Footer>{actionButtons}</ChakraDrawer.Footer>}

            <ChakraDrawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </ChakraDrawer.CloseTrigger>
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    </ChakraDrawer.Root>
  );
};

export { Drawer };
