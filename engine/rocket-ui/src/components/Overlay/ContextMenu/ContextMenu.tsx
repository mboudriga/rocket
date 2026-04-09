import { Menu as ChakraMenu, Kbd, Portal } from '@chakra-ui/react';
import { useMemo } from 'react';

import type { ContextMenuProps } from './ContextMenu.types';

const ContextMenu = ({
  ref,
  trigger,
  items,
  ...props
}: ContextMenuProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const menuItems = useMemo(
    () =>
      items?.map(({ value, label, icon, disabled, shortcut, onClick }) => (
        <ChakraMenu.Item key={value} value={value} disabled={disabled} onClick={onClick}>
          {icon}
          {label}
          {shortcut && <Kbd marginLeft="auto">{shortcut}</Kbd>}
        </ChakraMenu.Item>
      )) || null,
    [items]
  );

  return (
    <ChakraMenu.Root {...props}>
      <ChakraMenu.ContextTrigger asChild>{trigger}</ChakraMenu.ContextTrigger>
      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref}>{menuItems}</ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
};

export { ContextMenu };
