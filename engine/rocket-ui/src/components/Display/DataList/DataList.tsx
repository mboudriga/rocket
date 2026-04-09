import { DataList as ChakraDataList } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { StyleProps } from '../../../types';

import type { DataListProps } from './DataList.types';

const DataList = ({
  ref,
  items,
  ...props
}: DataListProps & {
  ref?: React.Ref<HTMLDListElement>;
}) => {
  const dataListItems = useMemo(
    () =>
      items?.map(({ label, value }) => (
        <ChakraDataList.Item key={label}>
          <ChakraDataList.ItemLabel>{label}</ChakraDataList.ItemLabel>
          <ChakraDataList.ItemValue>{value}</ChakraDataList.ItemValue>
        </ChakraDataList.Item>
      )) || null,
    [items]
  );

  return (
    <ChakraDataList.Root ref={ref} {...DataListStyles} {...props}>
      {dataListItems}
    </ChakraDataList.Root>
  );
};

const DataListStyles: StyleProps = {
  width: '100%',
};

export { DataList };
