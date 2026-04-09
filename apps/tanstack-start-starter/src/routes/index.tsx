import { Box, Button, Flex, Heading, Text } from '@rocket/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { LuArrowRight, LuRocket } from 'react-icons/lu';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <Flex.V align="center" justify="center" minHeight="100dvh" gap="8" p="8" bg="bg">
      <Flex
        align="center"
        justify="center"
        width="80px"
        height="80px"
        borderRadius="2xl"
        bg="blue.solid"
        color="blue.contrast"
      >
        <LuRocket size={40} />
      </Flex>

      <Flex.V align="center" gap="3" textAlign="center">
        <Heading size="3xl">TanStack Start Starter</Heading>
        <Text color="fg.muted" fontSize="lg" maxWidth="480px">
          A full-stack React starter with SSR, TanStack Router, TanStack Query, Zustand, and Rocket
          UI.
        </Text>
      </Flex.V>

      <Flex.H gap="4">
        <Link to="/dashboard">
          <Button colorPalette="blue" size="lg">
            Get Started <LuArrowRight />
          </Button>
        </Link>
      </Flex.H>

      <Box color="fg.subtle" fontSize="sm">
        <Text>Built with TanStack Start RC + Vite 8 + Nitro</Text>
      </Box>
    </Flex.V>
  );
}
