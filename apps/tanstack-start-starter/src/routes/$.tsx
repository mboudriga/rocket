import { Button, Flex, Heading, Text } from '@rocket/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { LuHouse } from 'react-icons/lu';

export const Route = createFileRoute('/$')({
  component: CatchAllPage,
});

function CatchAllPage() {
  return (
    <Flex.V align="center" justify="center" minHeight="100dvh" gap="4">
      <Heading size="2xl">404</Heading>
      <Text color="fg.muted">The page you're looking for doesn't exist.</Text>
      <Link to="/">
        <Button variant="outline">
          <LuHouse /> Go Home
        </Button>
      </Link>
    </Flex.V>
  );
}
