import { Link } from 'react-router';
import { Button, Flex, Heading, Text } from '@rocket/ui';
import { LuArrowRight } from 'react-icons/lu';

export default function Home() {
  return (
    <Flex.V align="center" justify="center" minH="100vh" gap="6" p="8">
      <Heading size="2xl">React Router Starter</Heading>
      <Text color="fg.muted" fontSize="lg">
        SSR + Config-based routing on React Router v7
      </Text>
      <Button asChild colorPalette="blue" size="lg">
        <Link to="/dashboard">
          Go to Dashboard <LuArrowRight />
        </Link>
      </Button>
    </Flex.V>
  );
}
