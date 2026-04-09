import { Popover as ChakraPopover } from '@chakra-ui/react';

import { PopoverDefaultProps, type PopoverProps } from './Popover.types';

const Popover = ({
  ref,
  trigger,
  title,
  children,
  hasArrow = PopoverDefaultProps.hasArrow,
  hasCloseButton = PopoverDefaultProps.hasCloseButton,
  lazyMount = PopoverDefaultProps.lazyMount,
  unmountOnExit = PopoverDefaultProps.unmountOnExit,
  ...props
}: PopoverProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraPopover.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props}>
      <ChakraPopover.Trigger asChild>{trigger}</ChakraPopover.Trigger>
      <ChakraPopover.Positioner>
        <ChakraPopover.Content ref={ref}>
          {hasArrow && (
            <ChakraPopover.Arrow>
              <ChakraPopover.ArrowTip />
            </ChakraPopover.Arrow>
          )}
          {hasCloseButton && <ChakraPopover.CloseTrigger />}
          {title && (
            <ChakraPopover.Header>
              <ChakraPopover.Title>{title}</ChakraPopover.Title>
            </ChakraPopover.Header>
          )}
          <ChakraPopover.Body>{children}</ChakraPopover.Body>
        </ChakraPopover.Content>
      </ChakraPopover.Positioner>
    </ChakraPopover.Root>
  );
};

export { Popover };
