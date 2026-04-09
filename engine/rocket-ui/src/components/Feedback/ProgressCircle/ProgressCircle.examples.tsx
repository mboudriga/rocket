import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { ProgressCircle } from './ProgressCircle';

export const ProgressCircleExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <ProgressCircle value={60} />
      </ExampleSection>

      {/* Different values */}
      <ExampleSection title="Progress Values">
        <Flex.H gap="6" wrap="wrap" align="center">
          <Flex.V align="center" gap="1">
            <ProgressCircle value={0} />
            <Text fontSize="xs" color="fg.muted">
              0%
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle value={25} />
            <Text fontSize="xs" color="fg.muted">
              25%
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle value={50} />
            <Text fontSize="xs" color="fg.muted">
              50%
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle value={75} />
            <Text fontSize="xs" color="fg.muted">
              75%
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle value={100} />
            <Text fontSize="xs" color="fg.muted">
              100%
            </Text>
          </Flex.V>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="6" wrap="wrap" align="center">
          <Flex.V align="center" gap="1">
            <ProgressCircle size="xs" value={60} />
            <Text fontSize="xs" color="fg.muted">
              xs
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle size="sm" value={60} />
            <Text fontSize="xs" color="fg.muted">
              sm
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle size="md" value={60} />
            <Text fontSize="xs" color="fg.muted">
              md
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle size="lg" value={60} />
            <Text fontSize="xs" color="fg.muted">
              lg
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <ProgressCircle size="xl" value={60} />
            <Text fontSize="xs" color="fg.muted">
              xl
            </Text>
          </Flex.V>
        </Flex.H>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="4" wrap="wrap">
          <ProgressCircle colorPalette="blue" value={60} />
          <ProgressCircle colorPalette="green" value={60} />
          <ProgressCircle colorPalette="red" value={60} />
          <ProgressCircle colorPalette="purple" value={60} />
          <ProgressCircle colorPalette="orange" value={60} />
          <ProgressCircle colorPalette="teal" value={60} />
        </Flex.H>
      </ExampleSection>

      {/* Indeterminate */}
      <ExampleSection title="Indeterminate">
        <Flex.H gap="4" wrap="wrap">
          <ProgressCircle value={null} />
          <ProgressCircle value={null} colorPalette="green" />
          <ProgressCircle value={null} colorPalette="purple" />
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
