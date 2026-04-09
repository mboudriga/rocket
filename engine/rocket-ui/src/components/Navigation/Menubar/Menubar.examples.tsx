import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import {
  LuClipboard,
  LuCopy,
  LuFileText,
  LuFolderOpen,
  LuPrinter,
  LuRedo,
  LuSave,
  LuScissors,
  LuUndo,
} from 'react-icons/lu';
import { Menubar } from './Menubar';

export const MenubarExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Menubar
          menus={[
            {
              label: 'File',
              items: [
                { value: 'new', label: 'New' },
                { value: 'open', label: 'Open' },
                { value: 'save', label: 'Save' },
              ],
            },
            {
              label: 'Edit',
              items: [
                { value: 'undo', label: 'Undo' },
                { value: 'redo', label: 'Redo' },
                { value: 'copy', label: 'Copy' },
              ],
            },
            {
              label: 'View',
              items: [
                { value: 'zoom-in', label: 'Zoom In' },
                { value: 'zoom-out', label: 'Zoom Out' },
              ],
            },
          ]}
        />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              sm
            </Text>
            <Menubar
              size="sm"
              menus={[
                {
                  label: 'File',
                  items: [
                    { value: 'new', label: 'New' },
                    { value: 'open', label: 'Open' },
                  ],
                },
                {
                  label: 'Edit',
                  items: [
                    { value: 'undo', label: 'Undo' },
                    { value: 'redo', label: 'Redo' },
                  ],
                },
              ]}
            />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              md (default)
            </Text>
            <Menubar
              size="md"
              menus={[
                {
                  label: 'File',
                  items: [
                    { value: 'new', label: 'New' },
                    { value: 'open', label: 'Open' },
                  ],
                },
                {
                  label: 'Edit',
                  items: [
                    { value: 'undo', label: 'Undo' },
                    { value: 'redo', label: 'Redo' },
                  ],
                },
              ]}
            />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* With icons */}
      <ExampleSection title="With Icons">
        <Menubar
          menus={[
            {
              label: 'File',
              items: [
                { value: 'new', label: 'New', icon: <LuFileText size={16} /> },
                { value: 'open', label: 'Open', icon: <LuFolderOpen size={16} /> },
                { value: 'save', label: 'Save', icon: <LuSave size={16} /> },
                { value: 'print', label: 'Print', icon: <LuPrinter size={16} /> },
              ],
            },
            {
              label: 'Edit',
              items: [
                { value: 'undo', label: 'Undo', icon: <LuUndo size={16} /> },
                { value: 'redo', label: 'Redo', icon: <LuRedo size={16} /> },
                { value: 'cut', label: 'Cut', icon: <LuScissors size={16} /> },
                { value: 'copy', label: 'Copy', icon: <LuCopy size={16} /> },
                { value: 'paste', label: 'Paste', icon: <LuClipboard size={16} /> },
              ],
            },
          ]}
        />
      </ExampleSection>

      {/* With shortcuts */}
      <ExampleSection title="With Keyboard Shortcuts">
        <Menubar
          menus={[
            {
              label: 'File',
              items: [
                { value: 'new', label: 'New', icon: <LuFileText size={16} />, shortcut: '⌘N' },
                { value: 'open', label: 'Open', icon: <LuFolderOpen size={16} />, shortcut: '⌘O' },
                { value: 'save', label: 'Save', icon: <LuSave size={16} />, shortcut: '⌘S' },
              ],
            },
            {
              label: 'Edit',
              items: [
                { value: 'undo', label: 'Undo', icon: <LuUndo size={16} />, shortcut: '⌘Z' },
                { value: 'redo', label: 'Redo', icon: <LuRedo size={16} />, shortcut: '⇧⌘Z' },
                { value: 'copy', label: 'Copy', icon: <LuCopy size={16} />, shortcut: '⌘C' },
                { value: 'paste', label: 'Paste', icon: <LuClipboard size={16} />, shortcut: '⌘V' },
              ],
            },
          ]}
        />
      </ExampleSection>

      {/* With disabled items */}
      <ExampleSection title="With Disabled Items">
        <Menubar
          menus={[
            {
              label: 'Edit',
              items: [
                { value: 'undo', label: 'Undo', icon: <LuUndo size={16} />, disabled: true },
                { value: 'redo', label: 'Redo', icon: <LuRedo size={16} />, disabled: true },
                { value: 'copy', label: 'Copy', icon: <LuCopy size={16} /> },
                { value: 'paste', label: 'Paste', icon: <LuClipboard size={16} /> },
              ],
            },
          ]}
        />
      </ExampleSection>
    </Flex.V>
  );
};
