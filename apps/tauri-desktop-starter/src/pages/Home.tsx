import { Badge, Card, Flex, Heading, Skeleton, Text } from '@rocket/ui';
import {
  LuCpu,
  LuGlobe,
  LuHardDrive,
  LuMonitor,
  LuServer,
} from 'react-icons/lu';
import { PageHeader } from '@/components/common';
import { useSystemInfo } from '@/hooks';

const infoCards = [
  { key: 'hostname', label: 'Hostname', icon: LuServer, color: 'blue' },
  { key: 'os_type', label: 'OS Type', icon: LuMonitor, color: 'green' },
  { key: 'arch', label: 'Architecture', icon: LuCpu, color: 'purple' },
  { key: 'platform', label: 'Platform', icon: LuGlobe, color: 'teal' },
  { key: 'version', label: 'Version', icon: LuHardDrive, color: 'orange' },
] as const;

export function Home() {
  const { info, loading, error } = useSystemInfo();

  return (
    <Flex.V gap="6">
      <PageHeader title="Home" description="System information from your machine" />

      {error && (
        <Card colorPalette="red">
          <Text color="red.fg">Failed to load system info: {error}</Text>
        </Card>
      )}

      <Flex.H gap="4" wrap="wrap">
        {infoCards.map(({ key, label, icon: Icon, color }) => (
          <Card key={key} colorPalette={color} minWidth="200px" flex="1">
            <Flex.V gap="3">
              <Flex.H align="center" gap="2">
                <Icon size={16} />
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  {label}
                </Text>
              </Flex.H>
              {loading ? (
                <Skeleton height="28px" width="80%" />
              ) : (
                <Flex.H align="center" gap="2">
                  <Heading size="md">
                    {info?.[key] ?? 'Unknown'}
                  </Heading>
                  <Badge colorPalette={color} variant="subtle" size="sm">
                    {key}
                  </Badge>
                </Flex.H>
              )}
            </Flex.V>
          </Card>
        ))}
      </Flex.H>
    </Flex.V>
  );
}
