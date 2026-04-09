'use client';

import { Card, Flex, Grid, Heading, Text } from '@rocket/ui';

interface DashboardStats {
  totalItems: number;
  recentActivity: number;
  completedTasks: number;
}

export function DashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <Flex.V gap="6">
      <Heading size="xl">Dashboard</Heading>

      <Grid templateColumns={{ base: '1fr', tablet: 'repeat(3, 1fr)' }} gap="6">
        <Card>
          <Flex.V gap="1">
            <Text color="fg.muted" fontSize="sm">
              Total Items
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {stats.totalItems}
            </Text>
          </Flex.V>
        </Card>

        <Card>
          <Flex.V gap="1">
            <Text color="fg.muted" fontSize="sm">
              Recent Activity
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {stats.recentActivity}
            </Text>
          </Flex.V>
        </Card>

        <Card>
          <Flex.V gap="1">
            <Text color="fg.muted" fontSize="sm">
              Completed Tasks
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {stats.completedTasks}
            </Text>
          </Flex.V>
        </Card>
      </Grid>
    </Flex.V>
  );
}
