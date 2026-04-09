import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { TooltipDefaultProps, type TooltipProps } from './Tooltip.types';

const Tooltip = ({
  ref,
  children,
  trigger,
  hasArrow = TooltipDefaultProps.hasArrow,
  ...props
}: TooltipProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraTooltip.Root {...props}>
      <ChakraTooltip.Trigger asChild>{trigger}</ChakraTooltip.Trigger>
      <ChakraTooltip.Positioner>
        <ChakraTooltip.Content ref={ref}>
          {hasArrow && (
            <ChakraTooltip.Arrow>
              <ChakraTooltip.ArrowTip />
            </ChakraTooltip.Arrow>
          )}
          {children}
        </ChakraTooltip.Content>
      </ChakraTooltip.Positioner>
    </ChakraTooltip.Root>
  );
};

export { Tooltip };
