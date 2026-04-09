import { HoverCard as ChakraHoverCard, Portal } from '@chakra-ui/react';

import { HoverCardDefaultProps, type HoverCardProps } from './HoverCard.types';

const HoverCard = ({
  ref,
  trigger,
  children,
  hasArrow = HoverCardDefaultProps.hasArrow,
  ...props
}: HoverCardProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraHoverCard.Root {...props}>
      <ChakraHoverCard.Trigger asChild>{trigger}</ChakraHoverCard.Trigger>
      <Portal>
        <ChakraHoverCard.Positioner>
          <ChakraHoverCard.Content ref={ref}>
            {hasArrow && (
              <ChakraHoverCard.Arrow>
                <ChakraHoverCard.ArrowTip />
              </ChakraHoverCard.Arrow>
            )}
            {children}
          </ChakraHoverCard.Content>
        </ChakraHoverCard.Positioner>
      </Portal>
    </ChakraHoverCard.Root>
  );
};

export { HoverCard };
