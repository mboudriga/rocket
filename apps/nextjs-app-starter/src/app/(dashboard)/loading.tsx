'use client';

import { Flex, Skeleton } from '@rocket/ui';

export default function DashboardLoading() {
  return (
    <Flex.V gap="6">
      <Skeleton height="40px" width="200px" />
      <Skeleton height="200px" />
      <Skeleton height="200px" />
    </Flex.V>
  );
}
