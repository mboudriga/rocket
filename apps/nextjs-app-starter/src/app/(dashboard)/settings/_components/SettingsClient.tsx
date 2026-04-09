'use client';

import { Card, Flex, Heading, Switch, Text } from '@rocket/ui';

export function SettingsClient() {
  return (
    <Flex.V gap="6">
      <Heading size="xl">Settings</Heading>

      <Card>
        <Flex.V gap="4">
          <Flex.H justify="space-between" align="center">
            <Flex.V gap="0">
              <Text fontWeight="semibold">Email Notifications</Text>
              <Text color="fg.muted" fontSize="sm">
                Receive email updates about your items
              </Text>
            </Flex.V>
            <Switch defaultChecked />
          </Flex.H>

          <Flex.H justify="space-between" align="center">
            <Flex.V gap="0">
              <Text fontWeight="semibold">Auto-archive</Text>
              <Text color="fg.muted" fontSize="sm">
                Automatically archive completed items after 30 days
              </Text>
            </Flex.V>
            <Switch />
          </Flex.H>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
