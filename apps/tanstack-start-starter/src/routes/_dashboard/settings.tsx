import { Box, Button, Card, Flex, Heading, NumberInput, Switch, Text } from '@rocket/ui';
import { createFileRoute } from '@tanstack/react-router';
import { LuRotateCcw } from 'react-icons/lu';

import { useSettingsStore } from '@/features/settings/store';

export const Route = createFileRoute('/_dashboard/settings')({
  ssr: false,
  component: SettingsPage,
});

function SettingsPage() {
  const notifications = useSettingsStore((s) => s.notifications);
  const itemsPerPage = useSettingsStore((s) => s.itemsPerPage);
  const actions = useSettingsStore((s) => s.actions);

  return (
    <Flex.V gap="6">
      <Box>
        <Heading size="xl" marginBottom="2">
          Settings
        </Heading>
        <Text color="fg.muted">Manage your preferences. Changes are saved automatically.</Text>
      </Box>

      <Card padding="6">
        <Heading size="md" marginBottom="4">
          Preferences
        </Heading>
        <Flex.V gap="5">
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Email Notifications</Text>
              <Text fontSize="sm" color="fg.muted">
                Receive email updates about new activity
              </Text>
            </Box>
            <Switch
              checked={notifications}
              onChange={(e) => actions.setNotifications(e.target.checked)}
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Items Per Page</Text>
              <Text fontSize="sm" color="fg.muted">
                Number of items to display in lists
              </Text>
            </Box>
            <Box width="100px">
              <NumberInput
                value={String(itemsPerPage)}
                onChange={(e) => actions.setItemsPerPage(Number(e.target.value))}
                min={5}
                max={50}
                step={5}
              />
            </Box>
          </Flex>
        </Flex.V>
      </Card>

      <Card padding="6">
        <Heading size="md" marginBottom="4">
          Reset
        </Heading>
        <Text color="fg.muted" marginBottom="4">
          Restore all settings to their default values.
        </Text>
        <Button variant="outline" colorPalette="red" onClick={actions.reset}>
          <LuRotateCcw /> Reset to Defaults
        </Button>
      </Card>
    </Flex.V>
  );
}
