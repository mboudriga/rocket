import { Box, Card, Flex, Grid, Heading, Text } from '@rocket/ui';
import { createFileRoute } from '@tanstack/react-router';
import { LuActivity, LuFileText, LuTrendingUp, LuUsers } from 'react-icons/lu';

import { StatCard } from '@/components/common/StatCard';

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <Flex.V gap="6">
      <Box>
        <Heading size="xl" marginBottom="2">
          Dashboard
        </Heading>
        <Text color="fg.muted">Welcome to the TanStack Start Starter.</Text>
      </Box>

      <Grid columns={{ base: 1, tablet: 2, desktop: 4 }} gap="4">
        <StatCard
          title="Total Users"
          value="2,543"
          change="+12%"
          icon={<LuUsers size={24} />}
          colorPalette="blue"
        />
        <StatCard
          title="Revenue"
          value="$45,231"
          change="+8%"
          icon={<LuTrendingUp size={24} />}
          colorPalette="green"
        />
        <StatCard
          title="Published Posts"
          value="1,234"
          change="+23%"
          icon={<LuFileText size={24} />}
          colorPalette="purple"
        />
        <StatCard
          title="Activity"
          value="573"
          change="-3%"
          icon={<LuActivity size={24} />}
          colorPalette="orange"
        />
      </Grid>

      <Card padding="6">
        <Heading size="md" marginBottom="4">
          Recent Activity
        </Heading>
        <Flex.V gap="3">
          {[
            { action: 'New post published', time: '2 minutes ago' },
            { action: 'User signed up', time: '15 minutes ago' },
            { action: 'Settings updated', time: '1 hour ago' },
            { action: 'Post draft saved', time: '3 hours ago' },
          ].map((item) => (
            <Flex
              key={item.action}
              justify="space-between"
              align="center"
              py="2"
              borderBottom="1px solid"
              borderColor="border"
            >
              <Text fontSize="sm">{item.action}</Text>
              <Text fontSize="xs" color="fg.subtle">
                {item.time}
              </Text>
            </Flex>
          ))}
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
