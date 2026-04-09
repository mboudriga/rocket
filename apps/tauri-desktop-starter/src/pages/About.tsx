import { Badge, Card, Flex, Heading, Link, Text } from '@rocket/ui';
import { LuExternalLink, LuRocket } from 'react-icons/lu';
import { PageHeader } from '@/components/common';

const techStack = [
  { name: 'Tauri', version: '2.x', color: 'blue' },
  { name: 'React', version: '19.x', color: 'cyan' },
  { name: 'Vite', version: '8.x', color: 'purple' },
  { name: 'TypeScript', version: '6.x', color: 'blue' },
  { name: 'Rust', version: 'stable', color: 'orange' },
  { name: '@rocket/ui', version: 'workspace', color: 'green' },
  { name: 'Zustand', version: '5.x', color: 'teal' },
] as const;

export function About() {
  return (
    <Flex.V gap="6">
      <PageHeader title="About" description="Application information" />

      <Card>
        <Flex.V gap="4" align="center" py="4">
          <LuRocket size={48} color="var(--chakra-colors-blue-fg)" />
          <Heading size="xl">Tauri Starter</Heading>
          <Text color="fg.muted">v0.0.1</Text>
          <Text textAlign="center" color="fg.muted" maxWidth="400px">
            A desktop application starter template built with Tauri v2 and React, following the
            Rocket monorepo conventions.
          </Text>
        </Flex.V>
      </Card>

      <Card title="Tech Stack">
        <Flex.H gap="2" wrap="wrap">
          {techStack.map(({ name, version, color }) => (
            <Badge key={name} colorPalette={color} variant="subtle" size="lg" px="3" py="1">
              {name} {version}
            </Badge>
          ))}
        </Flex.H>
      </Card>

      <Card title="Resources">
        <Flex.V gap="2">
          <Link href="https://v2.tauri.app" target="_blank">
            <Flex.H align="center" gap="2">
              <Text>Tauri Documentation</Text>
              <LuExternalLink size={14} />
            </Flex.H>
          </Link>
          <Link href="https://react.dev" target="_blank">
            <Flex.H align="center" gap="2">
              <Text>React Documentation</Text>
              <LuExternalLink size={14} />
            </Flex.H>
          </Link>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
