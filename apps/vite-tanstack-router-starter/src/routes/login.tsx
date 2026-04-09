import { Box, Button, Card, Flex, Heading, Input, Text } from '@rocket/ui';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { LuLock } from 'react-icons/lu';
import { z } from 'zod';

import { useAuth } from '@/features/auth';

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: (search.redirect ?? '/dashboard') as '/' });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const { redirect: redirectTo } = Route.useSearch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    router.history.push(redirectTo ?? '/dashboard');
  };

  return (
    <Flex.V align="center" justify="center" minHeight="60vh">
      <Card padding="8" width="100%" maxWidth="400px">
        <Heading size="lg" marginBottom="6" textAlign="center">
          Sign In
        </Heading>
        <form onSubmit={handleSubmit}>
          <Flex.V gap="4">
            <Box>
              <Text fontSize="sm" fontWeight="medium" marginBottom="1">
                Email
              </Text>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" marginBottom="1">
                Password
              </Text>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Button
              type="submit"
              colorPalette="blue"
              width="100%"
              loading={isLoading}
              marginTop="2"
            >
              <LuLock /> Sign In
            </Button>
          </Flex.V>
        </form>
        <Text fontSize="sm" color="gray.500" textAlign="center" marginTop="4">
          Demo: Enter any email and password to log in
        </Text>
      </Card>
    </Flex.V>
  );
}
