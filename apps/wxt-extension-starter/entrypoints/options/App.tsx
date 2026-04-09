import { Flex, Heading, Select, Switch, Tabs, Text } from '@rocket/ui';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notifications, setNotifications] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(false);

  useEffect(() => {
    themeStorage.getValue().then(setTheme);
    notificationsStorage.getValue().then(setNotifications);
    syncEnabledStorage.getValue().then(setSyncEnabled);

    const unwatchTheme = themeStorage.watch((v: 'light' | 'dark' | 'system' | null) =>
      setTheme(v ?? 'system')
    );
    const unwatchNotif = notificationsStorage.watch((v: boolean | null) =>
      setNotifications(v ?? true)
    );
    const unwatchSync = syncEnabledStorage.watch((v: boolean | null) => setSyncEnabled(v ?? false));

    return () => {
      unwatchTheme();
      unwatchNotif();
      unwatchSync();
    };
  }, []);

  return (
    <ExtensionProvider>
      <Flex.V p={8} maxW="600px" mx="auto" gap={6}>
        <Heading size="lg">Extension Settings</Heading>

        <Tabs
          tabs={[
            { value: 'general', title: 'General' },
            { value: 'sync', title: 'Sync' },
            { value: 'about', title: 'About' },
          ]}
          defaultValue="general"
        >
          {/* General Tab */}
          <Flex.V gap={4} pt={4}>
            <Text fontWeight="bold">Appearance</Text>
            <Select
              label="Theme"
              value={[theme]}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
              onChange={(e) => {
                const selected = JSON.parse(e.target.value)[0];
                themeStorage.setValue(selected);
              }}
            />
            <Switch
              label="Enable notifications"
              checked={notifications}
              onChange={(e) => {
                notificationsStorage.setValue(e.target.checked);
              }}
            />
          </Flex.V>

          {/* Sync Tab */}
          <Flex.V gap={4} pt={4}>
            <Text fontWeight="bold">Sync Settings</Text>
            <Switch
              label="Sync across devices"
              checked={syncEnabled}
              onChange={(e) => {
                syncEnabledStorage.setValue(e.target.checked);
              }}
            />
            <Text fontSize="sm" color="fg.muted">
              When enabled, your preferences will sync across all devices using this browser
              profile.
            </Text>
          </Flex.V>

          {/* About Tab */}
          <Flex.V gap={3} pt={4}>
            <Text fontWeight="bold">About</Text>
            <Text fontSize="sm" color="fg.muted">
              {EXTENSION_NAME} — A starter browser extension built with WXT, React, and Rocket UI.
            </Text>
            <Text fontSize="sm" color="fg.muted">
              Version {browser.runtime.getManifest().version}
            </Text>
          </Flex.V>
        </Tabs>
      </Flex.V>
    </ExtensionProvider>
  );
}
