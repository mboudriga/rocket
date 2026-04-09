import type { BreadcrumbRootProps } from '@chakra-ui/react';

export interface BreadcrumbItemProps {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps extends BreadcrumbRootProps {
  items?: Array<BreadcrumbItemProps>;
  separator?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const BreadcrumbDefaultProps: BreadcrumbProps = {
  size: 'md',
};
