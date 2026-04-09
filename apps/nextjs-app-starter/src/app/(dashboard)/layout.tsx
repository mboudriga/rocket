'use client';

import { Flex } from '@rocket/ui';
import type { ReactNode } from 'react';
import { Sidebar } from './_components/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex.H minH="100vh">
      <Sidebar />
      <Flex.V as="main" flex="1" p="6" bg="bg">
        {children}
      </Flex.V>
    </Flex.H>
  );
}
