import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import {
  LuClipboard,
  LuCopy,
  LuDownload,
  LuEye,
  LuPencil,
  LuRefreshCw,
  LuShare,
  LuTrash,
} from 'react-icons/lu';
import { ContextMenu } from './ContextMenu';

export const ContextMenuExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <ContextMenu
          trigger={
            <Box
              padding="6"
              border="2px dashed"
              borderColor="border"
              borderRadius="md"
              textAlign="center"
              cursor="context-menu"
            >
              <Text color="fg.muted">Right-click here</Text>
            </Box>
          }
          items={[
            { value: 'item1', label: 'Item 1' },
            { value: 'item2', label: 'Item 2' },
            { value: 'item3', label: 'Item 3' },
          ]}
        />
      </ExampleSection>

      {/* With icons */}
      <ExampleSection title="With Icons">
        <ContextMenu
          trigger={
            <Box
              padding="6"
              border="2px dashed"
              borderColor="border"
              borderRadius="md"
              textAlign="center"
              cursor="context-menu"
            >
              <Text color="fg.muted">Right-click here</Text>
            </Box>
          }
          items={[
            { value: 'edit', label: 'Edit', icon: <LuPencil /> },
            { value: 'copy', label: 'Copy', icon: <LuCopy /> },
            { value: 'paste', label: 'Paste', icon: <LuClipboard /> },
            { value: 'delete', label: 'Delete', icon: <LuTrash /> },
          ]}
        />
      </ExampleSection>

      {/* With keyboard shortcuts */}
      <ExampleSection title="With Keyboard Shortcuts">
        <ContextMenu
          trigger={
            <Box
              padding="6"
              border="2px dashed"
              borderColor="border"
              borderRadius="md"
              textAlign="center"
              cursor="context-menu"
            >
              <Text color="fg.muted">Right-click here</Text>
            </Box>
          }
          items={[
            { value: 'copy', label: 'Copy', icon: <LuCopy />, shortcut: '⌘C' },
            { value: 'paste', label: 'Paste', icon: <LuClipboard />, shortcut: '⌘V' },
            { value: 'refresh', label: 'Refresh', icon: <LuRefreshCw />, shortcut: '⌘R' },
          ]}
        />
      </ExampleSection>

      {/* With disabled items */}
      <ExampleSection title="With Disabled Items">
        <ContextMenu
          trigger={
            <Box
              padding="6"
              border="2px dashed"
              borderColor="border"
              borderRadius="md"
              textAlign="center"
              cursor="context-menu"
            >
              <Text color="fg.muted">Right-click here</Text>
            </Box>
          }
          items={[
            { value: 'view', label: 'View', icon: <LuEye /> },
            { value: 'edit', label: 'Edit', icon: <LuPencil />, disabled: true },
            { value: 'delete', label: 'Delete', icon: <LuTrash />, disabled: true },
          ]}
        />
      </ExampleSection>

      <Divider />

      {/* Use case: File manager */}
      <ExampleSection title="Use Case: File Manager">
        <ContextMenu
          trigger={
            <Box
              padding="4"
              border="1px solid"
              borderColor="border"
              borderRadius="md"
              cursor="context-menu"
              width="200px"
            >
              <Box
                width="80px"
                height="80px"
                bg="blue.subtle"
                borderRadius="md"
                marginX="auto"
                marginBottom="2"
              />
              <Text textAlign="center" fontSize="sm">
                document.pdf
              </Text>
              <Text textAlign="center" fontSize="xs" color="fg.muted">
                2.4 MB
              </Text>
            </Box>
          }
          items={[
            { value: 'open', label: 'Open' },
            { value: 'download', label: 'Download', icon: <LuDownload /> },
            { value: 'share', label: 'Share', icon: <LuShare /> },
            { value: 'rename', label: 'Rename', icon: <LuPencil /> },
            { value: 'delete', label: 'Delete', icon: <LuTrash /> },
          ]}
        />
      </ExampleSection>

      {/* Use case: Image gallery */}
      <ExampleSection title="Use Case: Image Gallery">
        <Flex.H gap="4" wrap="wrap">
          {['Photo 1', 'Photo 2', 'Photo 3'].map((photo, i) => (
            <ContextMenu
              key={i}
              trigger={
                <Box
                  width="120px"
                  height="120px"
                  bg="bg.muted"
                  borderRadius="md"
                  cursor="context-menu"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="sm" color="fg.muted">
                    {photo}
                  </Text>
                </Box>
              }
              items={[
                { value: 'view', label: 'View Full Size', icon: <LuEye /> },
                { value: 'download', label: 'Download', icon: <LuDownload /> },
                { value: 'share', label: 'Share', icon: <LuShare /> },
                { value: 'delete', label: 'Delete', icon: <LuTrash /> },
              ]}
            />
          ))}
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
