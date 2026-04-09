import { Button, Divider, Flex, Heading, Text } from '@rocket/ui';
import { LuExternalLink, LuSettings } from 'react-icons/lu';
import type { TabInfo } from '../../lib/types';

export default function App() {
  const [tabInfo, setTabInfo] = useState<TabInfo | null>(null);

  useEffect(() => {
    void browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tab = tabs[0];
      if (tab?.url) {
        setTabInfo({
          id: tab.id,
          title: tab.title ?? '',
          url: tab.url,
          favIconUrl: tab.favIconUrl,
        });
      }
    });
  }, []);

  return (
    <ExtensionProvider>
      <Flex.V p={4} gap={4}>
        <Flex.H align="center" justify="space-between">
          <Heading size="md">{EXTENSION_NAME}</Heading>
          <ThemeToggle />
        </Flex.H>

        <Divider />

        {tabInfo && (
          <Flex.V gap={1} p={3} bg="bg.muted" borderRadius="md">
            <Text fontWeight="bold" fontSize="sm" color="fg.muted">
              Current Tab
            </Text>
            <Text fontSize="sm" truncate>
              {tabInfo.title}
            </Text>
            <Text fontSize="xs" color="fg.subtle" truncate>
              {tabInfo.url}
            </Text>
          </Flex.V>
        )}

        <Divider />

        <Counter />

        <Divider />

        <Flex.H gap={2}>
          <Button
            size="sm"
            variant="outline"
            flex={1}
            onClick={() => void browser.runtime.openOptionsPage()}
          >
            <LuSettings /> Settings
          </Button>
          {tabInfo?.url && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => void browser.tabs.create({ url: tabInfo.url })}
            >
              <LuExternalLink />
            </Button>
          )}
        </Flex.H>
      </Flex.V>
    </ExtensionProvider>
  );
}
