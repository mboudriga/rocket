import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { Rating } from './Rating';

export const RatingExamples: FC = () => {
  const [rating, setRating] = useState(3);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Rating defaultValue={3} />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="3">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Small
            </Text>
            <Rating size="sm" defaultValue={4} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Medium
            </Text>
            <Rating size="md" defaultValue={4} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Large
            </Text>
            <Rating size="lg" defaultValue={4} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Allow half stars */}
      <ExampleSection title="Allow Half Stars">
        <Flex.H gap="4" wrap="wrap">
          <Rating allowHalf defaultValue={3.5} />
          <Rating allowHalf defaultValue={4.5} />
        </Flex.H>
      </ExampleSection>

      {/* Custom count */}
      <ExampleSection title="Custom Count">
        <Flex.V gap="3">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              3 stars
            </Text>
            <Rating count={3} defaultValue={2} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              10 stars
            </Text>
            <Rating count={10} defaultValue={7} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="6" wrap="wrap">
          <Rating colorPalette="yellow" defaultValue={4} />
          <Rating colorPalette="red" defaultValue={4} />
          <Rating colorPalette="blue" defaultValue={4} />
          <Rating colorPalette="green" defaultValue={4} />
          <Rating colorPalette="purple" defaultValue={4} />
        </Flex.H>
      </ExampleSection>

      {/* With label */}
      <ExampleSection title="With Label">
        <Rating label="Rate your experience" defaultValue={0} />
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.V gap="3">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Disabled
            </Text>
            <Rating disabled defaultValue={3} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Read Only
            </Text>
            <Rating readOnly defaultValue={4} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection title="Controlled">
        <Flex.H gap="3" align="center">
          <Rating value={rating} onChange={(e) => setRating(Number(e.target.value))} />
          <Text fontSize="sm" color="fg.muted">
            {rating} / 5
          </Text>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
