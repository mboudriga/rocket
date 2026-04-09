import { Box, Button, Card, Flex, Heading, Text } from '@rocket/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { LuArrowRight, LuRocket } from 'react-icons/lu';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <Flex.V align="center" justify="center" minHeight="60vh" gap="8">
      <Flex.V align="center" gap="4" textAlign="center" width="full">
        <Flex
          align="center"
          justify="center"
          width="80px"
          height="80px"
          borderRadius="2xl"
          bg="blue.500"
          color="white"
        >
          <LuRocket size={40} />
        </Flex>
        <Heading size="3xl">Welcome to Rocket App</Heading>
        <Text color="gray.600" fontSize="lg" maxWidth="500px">
          A starter template with TanStack Router, React Query, and Rocket UI components.
        </Text>
      </Flex.V>

      <Flex gap="4">
        <Link to="/login">
          <Button colorPalette="blue" size="lg">
            Get Started <LuArrowRight />
          </Button>
        </Link>
      </Flex>

      <Card padding="6" width="100%" maxWidth="600px" marginTop="8">
        <Heading size="md" marginBottom="4">
          Features
        </Heading>
        <Flex.V gap="3">
          <FeatureItem
            title="File-based Routing"
            description="Automatic route generation with TanStack Router"
          />
          <FeatureItem title="Authentication" description="Protected routes with auth guards" />
          <FeatureItem
            title="Data Fetching"
            description="React Query integration for server state"
          />
          <FeatureItem
            title="Type Safety"
            description="End-to-end type safety for routes and params"
          />
        </Flex.V>
      </Card>
    </Flex.V>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <Box>
      <Text fontWeight="semibold">{title}</Text>
      <Text fontSize="sm" color="gray.500">
        {description}
      </Text>
    </Box>
  );
}
