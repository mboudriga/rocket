import type { ListRootProps } from '@chakra-ui/react';

export interface ListProps extends ListRootProps {
  icon?: React.ReactNode;
  iconColor?: string;
}

export const ListDefaultProps: ListProps = {};
