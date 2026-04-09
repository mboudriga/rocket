import type { ColorPalette, TabsRootProps } from '@chakra-ui/react';

export interface TabItemProps {
  value: string;
  title: string;
  icon?: React.ReactNode;
}
export interface TabsProps extends Omit<TabsRootProps, 'onChange'> {
  children?: React.ReactNode;
  tabs?: Array<TabItemProps>;
  value?: TabsRootProps['value'];
  defaultValue?: TabsRootProps['defaultValue'];
  colorPalette?: ColorPalette;
  activationMode?: 'manual' | 'automatic';
  orientation?: 'horizontal' | 'vertical';
  variant?: 'line' | 'subtle' | 'enclosed' | 'outline' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  justify?: 'start' | 'center' | 'end';
  lazyMount?: TabsRootProps['lazyMount'];
  loopFocus?: TabsRootProps['loopFocus'];
  unmountOnExit?: TabsRootProps['unmountOnExit'];
  composite?: TabsRootProps['composite'];
  deselectable?: TabsRootProps['deselectable'];
  onChange?: (tab: string) => void;
}

export const TabsDefaultProps: TabsProps = {
  colorPalette: 'blue',
  activationMode: 'automatic',
  orientation: 'horizontal',
  variant: 'line',
  size: 'md',
  justify: 'start',
  lazyMount: false,
  loopFocus: true,
  unmountOnExit: false,
  composite: false,
  deselectable: false,
};
