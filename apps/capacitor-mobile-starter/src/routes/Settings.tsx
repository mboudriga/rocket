import { Button, Card, Flex, Select, Text } from '@rocket/ui';
import { useEffect } from 'react';
import { LuTrash } from 'react-icons/lu';
import { PageHeader } from '@/components/common';
import { useSettingsStore } from '@/stores/settings-store';

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function Settings() {
  const { theme, loading, loadSettings, setTheme, clearAllData } = useSettingsStore();

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
        </Flex.V>
      </Card>

      <Card>
        <Flex.H justify="space-between" align="center">
          <Flex.V gap="0">
            <Text fontWeight="medium">Clear All Data</Text>
            <Text fontSize="sm" color="fg.muted">
              Remove all stored preferences
            </Text>
          </Flex.V>
          <Button colorPalette="red" variant="outline" onClick={clearAllData}>
            <LuTrash /> Clear
          </Button>
        </Flex.H>
      </Card>
    </Flex.V>
  );
}
