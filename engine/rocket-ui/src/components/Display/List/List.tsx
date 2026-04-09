import { List as ChakraList } from '@chakra-ui/react';
import { Box } from '@components/Layout/Box';
import { Children, useId, useMemo } from 'react';

import type { ListProps } from './List.types';

const List = ({
  ref,
  children,
  icon,
  iconColor,
  ...props
}: ListProps & {
  ref?: React.Ref<HTMLUListElement>;
}) => {
  const baseId = useId();

  const listItems = useMemo(
    () =>
      children
        ? Children.toArray(children).map((child, index) => {
            // With custom icon: use inline-flex for icon + text alignment
            if (icon) {
              return (
                <ChakraList.Item
                  key={`${baseId}-${index}`}
                  _marker={{
                    color: 'transparent',
                  }}
                >
                  <Box display="inline-flex" alignItems="flex-start" gap="2">
                    <ChakraList.Indicator color={iconColor} flexShrink={0}>
                      {icon}
                    </ChakraList.Indicator>
                    <Box as="span" display="inline">
                      {child}
                    </Box>
                  </Box>
                </ChakraList.Item>
              );
            }

            // Without icon: wrap in inline Box to handle block-level children
            return (
              <ChakraList.Item
                key={`${baseId}-${index}`}
                _marker={{
                  color: 'fg.subtle',
                }}
              >
                <Box as="span" display="inline">
                  {child}
                </Box>
              </ChakraList.Item>
            );
          })
        : null,
    [children, icon, iconColor, baseId]
  );

  return (
    <ChakraList.Root ref={ref} listStylePosition="outside" paddingLeft="6" {...props}>
      {listItems}
    </ChakraList.Root>
  );
};

export { List };
