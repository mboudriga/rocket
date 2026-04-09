'use client';

import { Flex, Spinner } from '@rocket/ui';

export default function Loading() {
  return (
    <Flex.V align="center" justify="center" minH="100vh">
      <Spinner size="xl" />
    </Flex.V>
  );
}
