import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Progress } from './Progress';

export const ProgressExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box maxWidth="400px">
          <Progress value={60} />
        </Box>
      </ExampleSection>

      {/* Different values */}
      <ExampleSection title="Progress Values">
        <Flex.V gap="3" maxWidth="400px">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              0%
            </Text>
            <Progress value={0} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              25%
            </Text>
            <Progress value={25} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              50%
            </Text>
            <Progress value={50} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              75%
            </Text>
            <Progress value={75} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              100%
            </Text>
            <Progress value={100} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.V gap="3" maxWidth="400px">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Outline
            </Text>
            <Progress variant="outline" value={60} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Subtle
            </Text>
            <Progress variant="subtle" value={60} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="3" maxWidth="400px">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              xs
            </Text>
            <Progress size="xs" value={60} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              sm
            </Text>
            <Progress size="sm" value={60} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              md
            </Text>
            <Progress size="md" value={60} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              lg
            </Text>
            <Progress size="lg" value={60} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              xl
            </Text>
            <Progress size="xl" value={60} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Shape */}
      <ExampleSection title="Shapes">
        <Flex.V gap="3" maxWidth="400px">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Square
            </Text>
            <Progress shape="square" value={60} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Rounded
            </Text>
            <Progress shape="rounded" value={60} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Full
            </Text>
            <Progress shape="full" value={60} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Color Palettes">
        <Flex.V gap="3" maxWidth="400px">
          <Progress colorPalette="blue" value={60} />
          <Progress colorPalette="green" value={60} />
          <Progress colorPalette="red" value={60} />
          <Progress colorPalette="purple" value={60} />
          <Progress colorPalette="orange" value={60} />
        </Flex.V>
      </ExampleSection>

      {/* Indeterminate (no value) */}
      <ExampleSection title="Indeterminate">
        <Box maxWidth="400px">
          <Progress value={null} />
        </Box>
      </ExampleSection>

      <Divider />

      {/* Use case: File upload */}
      <ExampleSection title="Use Case: File Upload">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="400px">
          <Flex.H justify="space-between" marginBottom="2">
            <Text fontSize="sm">document.pdf</Text>
            <Text fontSize="sm" color="fg.muted">
              75%
            </Text>
          </Flex.H>
          <Progress value={75} colorPalette="blue" />
          <Text fontSize="xs" color="fg.muted" marginTop="1">
            Uploading... 3.2 MB of 4.3 MB
          </Text>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
