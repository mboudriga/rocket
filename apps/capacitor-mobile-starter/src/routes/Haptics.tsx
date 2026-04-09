import { Button, Card, Flex, Text } from '@rocket/ui';
import { LuVibrate } from 'react-icons/lu';
import { PageHeader } from '@/components/common';
import { useCapacitor } from '@/hooks/useCapacitor';
import { impactHeavy, impactLight, impactMedium, vibrate } from '@/services/haptics';

export function Haptics() {
  const { isNative } = useCapacitor();

  return (
    <Flex.V gap="6">
      <PageHeader title="Haptics" description="Trigger haptic feedback patterns" />

      {!isNative && (
        <Card colorPalette="orange">
          <Flex.H align="center" gap="3">
            <LuVibrate size={20} />
            <Text color="orange.fg">
              Haptics are only available on native devices. Run this app on iOS or Android to feel
              the feedback.
            </Text>
          </Flex.H>
        </Card>
      )}

      <Card>
        <Flex.V gap="4">
          <Text fontWeight="medium">Impact Styles</Text>
          <Flex.H gap="3" wrap="wrap">
            <Button
              colorPalette="blue"
              variant="outline"
              onClick={impactLight}
              flex="1"
              minWidth="120px"
            >
              Light
            </Button>
            <Button
              colorPalette="purple"
              variant="outline"
              onClick={impactMedium}
              flex="1"
              minWidth="120px"
            >
              Medium
            </Button>
            <Button
              colorPalette="orange"
              variant="outline"
              onClick={impactHeavy}
              flex="1"
              minWidth="120px"
            >
              Heavy
            </Button>
          </Flex.H>
        </Flex.V>
      </Card>

      <Card>
        <Flex.V gap="4">
          <Text fontWeight="medium">Vibration</Text>
          <Button colorPalette="teal" onClick={vibrate}>
            <LuVibrate />
            Vibrate
          </Button>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
