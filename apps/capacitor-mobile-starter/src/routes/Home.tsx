import { Capacitor } from '@capacitor/core';
import { Badge, Card, Flex, Heading, Text } from '@rocket/ui';
import { LuGlobe, LuMonitor, LuMove, LuSmartphone } from 'react-icons/lu';
import { PageHeader } from '@/components/common';

const platform = Capacitor.getPlatform();
const isNative = Capacitor.isNativePlatform();

const infoCards = [
  { key: 'platform', label: 'Platform', value: platform, icon: LuGlobe, color: 'blue' },
  {
    key: 'native',
    label: 'Native',
    value: isNative ? 'Yes' : 'No',
    icon: LuSmartphone,
    color: 'green',
  },
  {
    key: 'screen',
    label: 'Screen Size',
    value: `${window.innerWidth} × ${window.innerHeight}`,
    icon: LuMonitor,
    color: 'purple',
  },
  {
    key: 'userAgent',
    label: 'User Agent',
    value: navigator.userAgent.split('(')[1]?.split(')')[0] ?? 'Unknown',
    icon: LuMove,
    color: 'teal',
  },
] as const;

export function Home() {
  return (
    <Flex.V gap="6">
      <PageHeader title="Home" description="Device information" />

      <Flex.H gap="4" wrap="wrap">
        {infoCards.map(({ key, label, value, icon: Icon, color }) => (
          <Card key={key} colorPalette={color} minWidth="200px" flex="1">
            <Flex.V gap="3">
              <Flex.H align="center" gap="2">
                <Icon size={16} />
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  {label}
                </Text>
              </Flex.H>
              <Flex.H align="center" gap="2">
                <Heading size="md">{value}</Heading>
                <Badge colorPalette={color} variant="subtle" size="sm">
                  {key}
                </Badge>
              </Flex.H>
            </Flex.V>
          </Card>
        ))}
      </Flex.H>
    </Flex.V>
  );
}
