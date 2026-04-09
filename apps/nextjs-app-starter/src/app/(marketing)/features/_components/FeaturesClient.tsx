'use client';

import { Badge, Button, Card, Flex, Grid, Heading, Text } from '@rocket/ui';
import Link from 'next/link';
import { LuBox, LuLayers, LuServer, LuZap } from 'react-icons/lu';

const features = [
  {
    icon: <LuServer />,
    title: 'React Server Components',
    description: 'Server Components fetch data on the server and pass props to Client Components.',
  },
  {
    icon: <LuZap />,
    title: 'Server Actions',
    description: 'Mutate data with type-safe server functions using Zod validation.',
  },
  {
    icon: <LuLayers />,
    title: 'Route Groups',
    description:
      'Organize routes with (marketing) and (dashboard) groups sharing different layouts.',
  },
  {
    icon: <LuBox />,
    title: '@rocket/ui',
    description:
      'Full component library with Flex layouts, semantic tokens, and integrated form fields.',
  },
] as const;

export function FeaturesClient() {
  return (
    <Flex.V maxW="1000px" mx="auto" py="16" px="6" gap="8">
      <Flex.V gap="2" align="center">
        <Badge colorPalette="blue" size="lg">
          Features
        </Badge>
        <Heading size="3xl" textAlign="center">
          Built with modern patterns
        </Heading>
      </Flex.V>

      <Grid templateColumns={{ base: '1fr', tablet: 'repeat(2, 1fr)' }} gap="6">
        {features.map((feature) => (
          <Card key={feature.title}>
            <Flex.V gap="3">
              <Text fontSize="2xl">{feature.icon}</Text>
              <Heading size="md">{feature.title}</Heading>
              <Text color="fg.muted">{feature.description}</Text>
            </Flex.V>
          </Card>
        ))}
      </Grid>

      <Button asChild variant="outline" alignSelf="center">
        <Link href="/">Back to home</Link>
      </Button>
    </Flex.V>
  );
}
