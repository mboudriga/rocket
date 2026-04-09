import { Badge, Card, Flex, Heading, Text } from '@rocket/ui';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  colorPalette: string;
}

export function StatCard({ title, value, change, icon, colorPalette }: StatCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <Card padding="5" colorPalette={colorPalette}>
      <Flex justify="space-between" align="flex-start">
        <Flex.V gap="1" width="full">
          <Text fontSize="sm" color="fg.muted">
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
          bg="colorPalette.subtle"
          color="colorPalette.fg"
        >
          {icon}
        </Flex>
      </Flex>
    </Card>
  );
}
