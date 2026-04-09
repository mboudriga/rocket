import { Menu as ChakraMenu, Portal } from '@chakra-ui/react';
import { useMemo } from 'react';

import type { MenuProps } from './Menu.types';

const Menu = ({
  ref,
  trigger,
  items,
  ...props
}: MenuProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const menuItems = useMemo(
    () =>
      items?.map(({ value, label, icon, disabled, onClick }) => (
        <ChakraMenu.Item key={value} value={value} disabled={disabled} onClick={onClick}>
          {icon}
          {label}
        </ChakraMenu.Item>
      )) || null,
    [items]
  );

  return (
    <ChakraMenu.Root {...props}>
      <ChakraMenu.Trigger asChild>{trigger}</ChakraMenu.Trigger>
      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref}>{menuItems}</ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
};

export { Menu };
