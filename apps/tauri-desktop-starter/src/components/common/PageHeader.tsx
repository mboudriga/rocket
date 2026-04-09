import { Flex, Heading, Text } from '@rocket/ui';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Flex.H justify="space-between" align="center" flexShrink={0}>
      <Flex.V gap="1">
        <Heading size="lg">{title}</Heading>
        {description && (
          <Text color="fg.muted" fontSize="sm">
            {description}
          </Text>
        )}
      </Flex.V>
      {actions}
    </Flex.H>
  );
}
