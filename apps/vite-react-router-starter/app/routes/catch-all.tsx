import { Link } from 'react-router';
import { Button, Flex, Heading, Text } from '@rocket/ui';
import { LuHouse } from 'react-icons/lu';

export default function CatchAll() {
  return (
    <Flex.V align="center" justify="center" minH="100vh" gap="4">
      <Heading size="2xl">404</Heading>
      <Text color="fg.muted" fontSize="lg">
        Page not found
      </Text>
      <Button asChild variant="outline">
        <Link to="/">
          <LuHouse /> Go Home
        </Link>
      </Button>
    </Flex.V>
  );
}
