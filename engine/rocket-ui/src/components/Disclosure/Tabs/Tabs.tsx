import { Tabs as ChakraTabs } from '@chakra-ui/react';
import { Children, useMemo } from 'react';

import type { TabsProps } from './Tabs.types';

const Tabs = ({
  ref,
  children,
  tabs,
  onChange,
  ...props
}: TabsProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const tabList = useMemo(
    () =>
      tabs?.map(({ value, title, icon }) => (
        <ChakraTabs.Trigger key={value} value={value}>
          {icon && <>{icon}</>}
          {title}
        </ChakraTabs.Trigger>
      )) || null,
    [tabs]
  );

  const panels = useMemo(
    () =>
      Children.toArray(children).map((child, index) => (
        <ChakraTabs.Content key={tabs?.[index]?.value ?? index} value={tabs?.[index]?.value ?? ''}>
          {child}
        </ChakraTabs.Content>
      )) || null,
    [children, tabs]
  );

  return (
    <ChakraTabs.Root
      ref={ref}
      colorPalette="blue"
      width="full"
      onValueChange={(event) => onChange?.(event.value)}
      {...props}
    >
      <ChakraTabs.List>{tabList}</ChakraTabs.List>
      {children && <>{panels}</>}
    </ChakraTabs.Root>
  );
};

export { Tabs };
