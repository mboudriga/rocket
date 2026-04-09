import { Flex, Heading } from '@rocket/ui';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <Flex.H justify="space-between" align="center" mb="6">
      <Heading size="xl">{title}</Heading>
      {action}
    </Flex.H>
  );
}
