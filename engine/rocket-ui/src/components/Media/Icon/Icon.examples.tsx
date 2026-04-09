import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import {
  LuArrowRight,
  LuBell,
  LuCheck,
  LuChevronDown,
  LuChevronRight,
  LuCopy,
  LuDownload,
  LuExternalLink,
  LuHeart,
  LuHouse,
  LuMail,
  LuMinus,
  LuPencil,
  LuPlus,
  LuSearch,
  LuSettings,
  LuShare,
  LuStar,
  LuTrash,
  LuUpload,
  LuUser,
  LuX,
} from 'react-icons/lu';
import { Icon } from './Icon';

export const IconExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Flex.H gap="4" align="center">
          <Icon as={LuHouse} />
          <Icon as={LuUser} />
          <Icon as={LuSettings} />
          <Icon as={LuSearch} />
        </Flex.H>
      </ExampleSection>

      {/* Sizes (using boxSize) */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" align="center">
          {[3, 4, 5, 6, 8, 10, 12].map((size) => (
            <Box key={size} textAlign="center">
              <Icon as={LuStar} boxSize={size} />
              <Text fontSize="xs" color="fg.muted" marginTop="1">
                {size}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Colors">
        <Flex.H gap="4" align="center">
          <Icon as={LuHeart} boxSize={6} color="red.fg" />
          <Icon as={LuStar} boxSize={6} color="yellow.fg" />
          <Icon as={LuCheck} boxSize={6} color="green.fg" />
          <Icon as={LuBell} boxSize={6} color="blue.fg" />
          <Icon as={LuMail} boxSize={6} color="purple.fg" />
          <Icon as={LuSettings} boxSize={6} color="fg.muted" />
        </Flex.H>
      </ExampleSection>

      {/* Common action icons */}
      <ExampleSection title="Common Actions">
        <Flex.H gap="6" wrap="wrap">
          {[
            { icon: LuPlus, label: 'Add' },
            { icon: LuMinus, label: 'Remove' },
            { icon: LuPencil, label: 'Edit' },
            { icon: LuTrash, label: 'Delete' },
            { icon: LuCopy, label: 'Copy' },
            { icon: LuShare, label: 'Share' },
            { icon: LuDownload, label: 'Download' },
            { icon: LuUpload, label: 'Upload' },
          ].map(({ icon, label }) => (
            <Flex.V key={label} align="center" gap="1">
              <Icon as={icon} boxSize={5} color="fg.muted" />
              <Text fontSize="xs" color="fg.muted">
                {label}
              </Text>
            </Flex.V>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Navigation icons */}
      <ExampleSection title="Navigation">
        <Flex.H gap="6" wrap="wrap">
          {[
            { icon: LuChevronRight, label: 'Next' },
            { icon: LuChevronDown, label: 'Expand' },
            { icon: LuArrowRight, label: 'Arrow' },
            { icon: LuExternalLink, label: 'External' },
          ].map(({ icon, label }) => (
            <Flex.V key={label} align="center" gap="1">
              <Icon as={icon} boxSize={5} color="fg.muted" />
              <Text fontSize="xs" color="fg.muted">
                {label}
              </Text>
            </Flex.V>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Status icons */}
      <ExampleSection title="Status Icons">
        <Flex.H gap="6" wrap="wrap">
          <Flex.H gap="2" align="center">
            <Icon as={LuCheck} boxSize={5} color="green.fg" />
            <Text fontSize="sm">Success</Text>
          </Flex.H>
          <Flex.H gap="2" align="center">
            <Icon as={LuX} boxSize={5} color="red.fg" />
            <Text fontSize="sm">Error</Text>
          </Flex.H>
          <Flex.H gap="2" align="center">
            <Icon as={LuBell} boxSize={5} color="orange.fg" />
            <Text fontSize="sm">Warning</Text>
          </Flex.H>
          <Flex.H gap="2" align="center">
            <Icon as={LuMail} boxSize={5} color="blue.fg" />
            <Text fontSize="sm">Info</Text>
          </Flex.H>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
