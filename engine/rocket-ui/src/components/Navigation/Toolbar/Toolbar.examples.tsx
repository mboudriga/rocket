import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuDownload,
  LuExternalLink,
  LuImage,
  LuItalic,
  LuLink,
  LuMaximize,
  LuPause,
  LuPlay,
  LuRedo,
  LuRotateCcw,
  LuShare,
  LuSkipBack,
  LuSkipForward,
  LuStrikethrough,
  LuUnderline,
  LuUndo,
  LuVolume2,
  LuZoomIn,
  LuZoomOut,
} from 'react-icons/lu';
import { Toolbar } from './Toolbar';

export const ToolbarExamples: FC = () => {
  const [alignment, setAlignment] = useState('left');
  const [formatting, setFormatting] = useState<Array<string>>([]);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Toolbar>
          <Toolbar.Button icon={<LuUndo size={16} />} label="Undo" />
          <Toolbar.Button icon={<LuRedo size={16} />} label="Redo" />
          <Toolbar.Separator />
          <Toolbar.Button icon={<LuBold size={16} />} label="Bold" />
          <Toolbar.Button icon={<LuItalic size={16} />} label="Italic" />
        </Toolbar>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Box key={size}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                {size}
              </Text>
              <Toolbar size={size}>
                <Toolbar.Button
                  icon={<LuBold size={size === 'sm' ? 14 : size === 'md' ? 16 : 20} />}
                  label="Bold"
                />
                <Toolbar.Button
                  icon={<LuItalic size={size === 'sm' ? 14 : size === 'md' ? 16 : 20} />}
                  label="Italic"
                />
                <Toolbar.Button
                  icon={<LuUnderline size={size === 'sm' ? 14 : size === 'md' ? 16 : 20} />}
                  label="Underline"
                />
              </Toolbar>
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* With toggle groups */}
      <ExampleSection title="Toggle Groups">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Single Selection (Alignment)
            </Text>
            <Toolbar>
              <Toolbar.ToggleGroup
                type="single"
                value={alignment}
                onValueChange={(value) => setAlignment(value as string)}
              >
                <Toolbar.ToggleItem
                  value="left"
                  icon={<LuAlignLeft size={16} />}
                  label="Align Left"
                />
                <Toolbar.ToggleItem
                  value="center"
                  icon={<LuAlignCenter size={16} />}
                  label="Align Center"
                />
                <Toolbar.ToggleItem
                  value="right"
                  icon={<LuAlignRight size={16} />}
                  label="Align Right"
                />
                <Toolbar.ToggleItem
                  value="justify"
                  icon={<LuAlignJustify size={16} />}
                  label="Justify"
                />
              </Toolbar.ToggleGroup>
            </Toolbar>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              Selected: {alignment}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Multiple Selection (Formatting)
            </Text>
            <Toolbar>
              <Toolbar.ToggleGroup
                type="multiple"
                value={formatting}
                onValueChange={(value) => setFormatting(value as Array<string>)}
              >
                <Toolbar.ToggleItem value="bold" icon={<LuBold size={16} />} label="Bold" />
                <Toolbar.ToggleItem value="italic" icon={<LuItalic size={16} />} label="Italic" />
                <Toolbar.ToggleItem
                  value="underline"
                  icon={<LuUnderline size={16} />}
                  label="Underline"
                />
                <Toolbar.ToggleItem
                  value="strikethrough"
                  icon={<LuStrikethrough size={16} />}
                  label="Strikethrough"
                />
              </Toolbar.ToggleGroup>
            </Toolbar>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              Selected: {formatting.join(', ') || 'none'}
            </Text>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Vertical orientation */}
      <ExampleSection title="Vertical Orientation">
        <Toolbar orientation="vertical" width="fit-content">
          <Toolbar.Button icon={<LuBold size={16} />} label="Bold" />
          <Toolbar.Button icon={<LuItalic size={16} />} label="Italic" />
          <Toolbar.Button icon={<LuUnderline size={16} />} label="Underline" />
          <Toolbar.Separator />
          <Toolbar.Button icon={<LuLink size={16} />} label="Link" />
          <Toolbar.Button icon={<LuImage size={16} />} label="Image" />
        </Toolbar>
      </ExampleSection>

      {/* With disabled items */}
      <ExampleSection title="With Disabled Items">
        <Toolbar>
          <Toolbar.Button icon={<LuUndo size={16} />} label="Undo" disabled />
          <Toolbar.Button icon={<LuRedo size={16} />} label="Redo" disabled />
          <Toolbar.Separator />
          <Toolbar.Button icon={<LuBold size={16} />} label="Bold" />
          <Toolbar.Button icon={<LuItalic size={16} />} label="Italic" />
        </Toolbar>
      </ExampleSection>

      {/* With links */}
      <ExampleSection title="With Links">
        <Toolbar>
          <Toolbar.Button icon={<LuDownload size={16} />} label="Download" />
          <Toolbar.Button icon={<LuShare size={16} />} label="Share" />
          <Toolbar.Separator />
          <Toolbar.Link icon={<LuExternalLink size={16} />} href="#" label="Open External" />
        </Toolbar>
      </ExampleSection>

      <Divider />

      {/* Use case: Media player */}
      <ExampleSection title="Use Case: Media Player Controls">
        <Toolbar>
          <Toolbar.Button icon={<LuSkipBack size={16} />} label="Previous" />
          <Toolbar.Button icon={<LuPlay size={16} />} label="Play" />
          <Toolbar.Button icon={<LuPause size={16} />} label="Pause" />
          <Toolbar.Button icon={<LuSkipForward size={16} />} label="Next" />
          <Toolbar.Separator />
          <Toolbar.Button icon={<LuVolume2 size={16} />} label="Volume" />
          <Toolbar.Separator />
          <Toolbar.Button icon={<LuMaximize size={16} />} label="Fullscreen" />
        </Toolbar>
      </ExampleSection>

      {/* Use case: Image editor */}
      <ExampleSection title="Use Case: Image Editor">
        <Flex.H gap="4">
          <Toolbar orientation="vertical">
            <Toolbar.Button icon={<LuZoomIn size={16} />} label="Zoom In" />
            <Toolbar.Button icon={<LuZoomOut size={16} />} label="Zoom Out" />
            <Toolbar.Separator />
            <Toolbar.Button icon={<LuRotateCcw size={16} />} label="Rotate" />
            <Toolbar.Separator />
            <Toolbar.Button icon={<LuDownload size={16} />} label="Download" />
          </Toolbar>
          <Box
            flex="1"
            bg="bg.muted"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="fg.muted">Image Preview</Text>
          </Box>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
