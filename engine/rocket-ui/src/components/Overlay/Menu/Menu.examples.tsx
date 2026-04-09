import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import {
  LuChevronDown,
  LuCopy,
  LuDownload,
  LuEllipsisVertical,
  LuLogOut,
  LuPencil,
  LuPlus,
  LuSave,
  LuSettings,
  LuShare,
  LuStar,
  LuTrash,
  LuUser,
} from 'react-icons/lu';
import { Menu } from './Menu';

export const MenuExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Menu
          trigger={
            <Button variant="outline">
              Open Menu <LuChevronDown />
            </Button>
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
        <Menu
          trigger={
            <Button variant="outline">
              Actions <LuChevronDown />
            </Button>
          }
          items={[
            { value: 'edit', label: 'Edit', icon: <LuPencil /> },
            { value: 'copy', label: 'Copy', icon: <LuCopy /> },
            { value: 'download', label: 'Download', icon: <LuDownload /> },
            { value: 'share', label: 'Share', icon: <LuShare /> },
          ]}
        />
      </ExampleSection>

      {/* With disabled items */}
      <ExampleSection title="With Disabled Items">
        <Menu
          trigger={
            <Button variant="outline">
              Menu <LuChevronDown />
            </Button>
          }
          items={[
            { value: 'available', label: 'Available action' },
            { value: 'disabled1', label: 'Disabled action', disabled: true },
            { value: 'another', label: 'Another action' },
            { value: 'disabled2', label: 'Also disabled', disabled: true },
          ]}
        />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap">
          <Menu
            size="sm"
            trigger={
              <Button variant="outline" size="sm">
                Small <LuChevronDown />
              </Button>
            }
            items={[
              { value: 'item1', label: 'Item 1' },
              { value: 'item2', label: 'Item 2' },
            ]}
          />
          <Menu
            size="md"
            trigger={
              <Button variant="outline">
                Medium <LuChevronDown />
              </Button>
            }
            items={[
              { value: 'item1', label: 'Item 1' },
              { value: 'item2', label: 'Item 2' },
            ]}
          />
        </Flex.H>
      </ExampleSection>

      {/* With click handlers */}
      <ExampleSection title="With Click Handlers">
        <Menu
          trigger={
            <Button colorPalette="blue">
              File <LuChevronDown />
            </Button>
          }
          items={[
            {
              value: 'new',
              label: 'New File',
              icon: <LuPlus />,
              onClick: () => {
                /* no-op */
              },
            },
            {
              value: 'save',
              label: 'Save',
              icon: <LuSave />,
              onClick: () => {
                /* no-op */
              },
            },
            {
              value: 'download',
              label: 'Download',
              icon: <LuDownload />,
              onClick: () => {
                /* no-op */
              },
            },
          ]}
        />
      </ExampleSection>

      <Divider />

      {/* Use case: User menu */}
      <ExampleSection title="Use Case: User Menu">
        <Menu
          trigger={
            <Button variant="ghost">
              <Box width="24px" height="24px" borderRadius="full" bg="blue.subtle" />
              John Doe
              <LuChevronDown />
            </Button>
          }
          items={[
            { value: 'profile', label: 'My Profile', icon: <LuUser /> },
            { value: 'settings', label: 'Settings', icon: <LuSettings /> },
            { value: 'logout', label: 'Log out', icon: <LuLogOut /> },
          ]}
        />
      </ExampleSection>

      {/* Use case: More actions */}
      <ExampleSection title="Use Case: More Actions Button">
        <Box
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Flex.H justify="space-between" align="center" gap="8">
            <Box>
              <Text fontWeight="semibold">Project Name</Text>
              <Text fontSize="sm" color="fg.muted">
                Last edited 2 hours ago
              </Text>
            </Box>
            <Menu
              trigger={
                <Button variant="ghost" size="sm" aria-label="More actions">
                  <LuEllipsisVertical />
                </Button>
              }
              items={[
                { value: 'edit', label: 'Edit', icon: <LuPencil /> },
                { value: 'star', label: 'Add to favorites', icon: <LuStar /> },
                { value: 'share', label: 'Share', icon: <LuShare /> },
                { value: 'delete', label: 'Delete', icon: <LuTrash /> },
              ]}
            />
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: Table row actions */}
      <ExampleSection title="Use Case: Table Row Actions">
        <Box
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
          width="400px"
        >
          {['Document A', 'Document B', 'Document C'].map((doc, i) => (
            <Flex.H
              key={i}
              justify="space-between"
              align="center"
              padding="3"
              borderBottom={i < 2 ? '1px solid' : 'none'}
              borderColor="border"
            >
              <Text fontSize="sm">{doc}</Text>
              <Menu
                trigger={
                  <Button variant="ghost" size="xs" aria-label={`${doc} actions`}>
                    <LuEllipsisVertical />
                  </Button>
                }
                size="sm"
                items={[
                  { value: 'view', label: 'View' },
                  { value: 'edit', label: 'Edit' },
                  { value: 'delete', label: 'Delete' },
                ]}
              />
            </Flex.H>
          ))}
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
