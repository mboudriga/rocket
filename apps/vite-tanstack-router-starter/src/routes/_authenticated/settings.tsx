import { Box, Button, Card, Flex, Heading, Input, Switch, Text } from '@rocket/ui';
import { createFileRoute } from '@tanstack/react-router';
import { LuSave } from 'react-icons/lu';

import { useAuth } from '@/features/auth';

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();

  return (
    <Flex.V gap="6">
      <Box>
        <Heading size="xl" marginBottom="2">
          Settings
        </Heading>
        <Text color="gray.600">Manage your account settings and preferences.</Text>
      </Box>

      <Card padding="6">
        <Heading size="md" marginBottom="4">
          Profile
        </Heading>
        <Flex.V gap="4">
          <Box>
            <Text fontSize="sm" fontWeight="medium" marginBottom="1">
              Name
            </Text>
            <Input defaultValue={user?.name} />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" marginBottom="1">
              Email
            </Text>
            <Input defaultValue={user?.email} type="email" />
          </Box>
          <Button colorPalette="blue" width="fit-content">
            <LuSave /> Save Changes
          </Button>
        </Flex.V>
      </Card>

      <Card padding="6">
        <Heading size="md" marginBottom="4">
          Preferences
        </Heading>
        <Flex.V gap="4">
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Email Notifications</Text>
              <Text fontSize="sm" color="gray.500">
                Receive email updates about your account
              </Text>
            </Box>
            <Switch defaultChecked />
          </Flex>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Marketing Emails</Text>
              <Text fontSize="sm" color="gray.500">
                Receive emails about new features and updates
              </Text>
            </Box>
            <Switch />
          </Flex>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
