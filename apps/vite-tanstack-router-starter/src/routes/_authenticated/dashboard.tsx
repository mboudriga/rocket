import { Badge, Box, Card, Flex, Grid, Heading, Text } from '@rocket/ui';
import { createFileRoute } from '@tanstack/react-router';
import { LuActivity, LuBox, LuTrendingUp, LuUsers } from 'react-icons/lu';

import { useAuth } from '@/features/auth';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  return (
    <Flex.V gap="6">
      <Box>
        <Heading size="xl" marginBottom="2">
          Dashboard
        </Heading>
        <Text color="gray.600">Welcome back, {user?.name}!</Text>
      </Box>

      <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
        <StatCard
          title="Total Users"
          value="2,543"
          change="+12%"
          icon={<LuUsers size={24} />}
          color="blue"
        />
        <StatCard
          title="Revenue"
          value="$45,231"
          change="+8%"
          icon={<LuTrendingUp size={24} />}
          color="green"
        />
        <StatCard
          title="Active Items"
          value="1,234"
          change="+23%"
          icon={<LuBox size={24} />}
          color="purple"
        />
        <StatCard
          title="Activity"
          value="573"
          change="-3%"
          icon={<LuActivity size={24} />}
          color="orange"
        />
      </Grid>

      <Card padding="6">
        <Heading size="md" marginBottom="4">
          Recent Activity
        </Heading>
        <Text color="gray.500">No recent activity to display.</Text>
      </Card>
    </Flex.V>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  const isPositive = change.startsWith('+');
  return (
    <Card padding="5">
      <Flex justify="space-between" align="flex-start">
        <Flex.V gap="1" width="full">
          <Text fontSize="sm" color="gray.500">
            {title}
          </Text>
          <Heading size="xl">{value}</Heading>
          <Badge colorPalette={isPositive ? 'green' : 'red'} size="sm" variant="subtle">
            {change}
          </Badge>
        </Flex.V>
        <Flex
          align="center"
          justify="center"
          width="48px"
          height="48px"
          borderRadius="lg"
          bg={`${color}.100`}
          color={`${color}.600`}
        >
          {icon}
        </Flex>
      </Flex>
    </Card>
  );
}
