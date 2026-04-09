import { Card, Flex, Select, Switch, Text } from '@rocket/ui';
import { useEffect } from 'react';
import { PageHeader } from '@/components/common';
import { useSettingsStore } from '@/stores/settings-store';

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function Settings() {
  const { theme, sidebarDefault, loading, loadSettings, setTheme, setSidebarDefault } =
    useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  if (loading) return null;

  return (
    <Flex.V gap="6">
      <PageHeader title="Settings" description="Configure your preferences" />

      <Card>
        <Flex.V gap="6">
          <Flex.H justify="space-between" align="center">
            <Flex.V gap="0">
              <Text fontWeight="medium">Theme</Text>
              <Text fontSize="sm" color="fg.muted">
                Choose your preferred color scheme
              </Text>
            </Flex.V>
            <Select
              options={themeOptions}
              value={[theme]}
              onChange={(e) => setTheme(JSON.parse(e.target.value)[0])}
              width="160px"
            />
          </Flex.H>

          <Flex.H justify="space-between" align="center">
            <Flex.V gap="0">
              <Text fontWeight="medium">Sidebar Default Open</Text>
              <Text fontSize="sm" color="fg.muted">
                Start with the sidebar expanded
              </Text>
            </Flex.V>
            <Switch
              checked={sidebarDefault}
              onChange={(e) => setSidebarDefault(e.target.checked)}
            />
          </Flex.H>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
