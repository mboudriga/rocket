import type { TextProps as ChakraTextProps, HighlightProps } from '@chakra-ui/react';

export interface TextProps extends ChakraTextProps {
  highlight?: Omit<HighlightProps, 'children'>;
  /** If present, a tooltip will be rendered. */
  tooltip?: string;
  /** If `true`, the tooltip will remain closed even if a tooltip is present. */
  tooltipDisabled?: boolean;
  lineClamp?: ChakraTextProps['lineClamp'];
}

export const TextDefaultProps: TextProps = {
  tooltip: '',
  tooltipDisabled: false,
};
