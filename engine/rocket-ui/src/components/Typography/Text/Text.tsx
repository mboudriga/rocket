import { Text as ChakraText, Highlight } from '@chakra-ui/react';
import { Tooltip } from '@components/Overlay/Tooltip';

import { TextDefaultProps, type TextProps } from './Text.types';

// TODO: Replace highlight prop with query + highlightVariant
const Text = ({
  ref,
  children,
  as = 'div',
  highlight,
  tooltip = TextDefaultProps.tooltip,
  tooltipDisabled = TextDefaultProps.tooltipDisabled,
  ...props
}: TextProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const text = (
    <ChakraText ref={ref} as={as} {...props}>
      {highlight ? <Highlight {...highlight}>{`${children}`}</Highlight> : children}
    </ChakraText>
  );

  return (
    <>
      {tooltip ? (
        <Tooltip trigger={text} disabled={tooltipDisabled}>
          {tooltip}
        </Tooltip>
      ) : (
        text
      )}
    </>
  );
};

export { Text };
