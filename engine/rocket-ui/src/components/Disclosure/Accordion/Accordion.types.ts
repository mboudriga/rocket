import type { AccordionRootProps } from '@chakra-ui/react';

export interface AccordionItemProps {
  value: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps extends AccordionRootProps {
  items?: Array<AccordionItemProps>;
  value?: AccordionRootProps['value'];
  defaultValue?: AccordionRootProps['defaultValue'];
  variant?: 'outline' | 'subtle' | 'enclosed' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  lazyMount?: AccordionRootProps['lazyMount'];
  collapsible?: AccordionRootProps['collapsible'];
  multiple?: AccordionRootProps['multiple'];
  disabled?: AccordionRootProps['disabled'];
  unmountOnExit?: AccordionRootProps['unmountOnExit'];
  onFocusChange?: AccordionRootProps['onFocusChange'];
  onValueChange?: AccordionRootProps['onValueChange'];
}

export const AccordionDefaultProps: AccordionProps = {
  variant: 'enclosed',
  size: 'md',
  collapsible: true,
  multiple: false,
  disabled: false,
  lazyMount: false,
  unmountOnExit: false,
};
