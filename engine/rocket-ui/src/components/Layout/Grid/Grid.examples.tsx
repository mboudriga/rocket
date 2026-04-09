import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Grid } from './Grid';

export const GridExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Grid columns={3} gap="4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i} padding="4" bg="blue.subtle" borderRadius="md" textAlign="center">
              <Text>{i}</Text>
            </Box>
          ))}
        </Grid>
      </ExampleSection>

      {/* Different column counts */}
      <ExampleSection title="Column Counts">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              2 columns
            </Text>
            <Grid columns={2} gap="3">
              {[1, 2, 3, 4].map((i) => (
                <Box key={i} padding="3" bg="green.subtle" borderRadius="md" textAlign="center">
                  <Text fontSize="sm">{i}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              4 columns
            </Text>
            <Grid columns={4} gap="3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Box key={i} padding="3" bg="purple.subtle" borderRadius="md" textAlign="center">
                  <Text fontSize="sm">{i}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Gap sizes */}
      <ExampleSection title="Gap Sizes">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              gap="2"
            </Text>
            <Grid columns={4} gap="2">
              {[1, 2, 3, 4].map((i) => (
                <Box key={i} padding="3" bg="orange.subtle" borderRadius="md" textAlign="center">
                  <Text fontSize="sm">{i}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              gap="6"
            </Text>
            <Grid columns={4} gap="6">
              {[1, 2, 3, 4].map((i) => (
                <Box key={i} padding="3" bg="orange.subtle" borderRadius="md" textAlign="center">
                  <Text fontSize="sm">{i}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Flex.V>
      </ExampleSection>

      <Divider />

      {/* Use case: Image gallery */}
      <ExampleSection title="Use Case: Image Gallery">
        <Grid columns={3} gap="3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box
              key={i}
              height="100px"
              bg="bg.muted"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="fg.muted">Image {i}</Text>
            </Box>
          ))}
        </Grid>
      </ExampleSection>

      {/* Use case: Feature cards */}
      <ExampleSection title="Use Case: Feature Cards">
        <Grid columns={3} gap="4">
          {[
            { icon: '🚀', title: 'Fast', desc: 'Lightning quick performance' },
            { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
            { icon: '🎨', title: 'Tasteful', desc: 'Modern, clean design' },
          ].map((feature, i) => (
            <Box
              key={i}
              padding="4"
              bg="bg"
              border="1px solid"
              borderColor="border"
              borderRadius="lg"
              textAlign="center"
            >
              <Text fontSize="2xl" marginBottom="2">
                {feature.icon}
              </Text>
              <Text fontWeight="semibold" marginBottom="1">
                {feature.title}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {feature.desc}
              </Text>
            </Box>
          ))}
        </Grid>
      </ExampleSection>

      {/* Use case: Stats dashboard */}
      <ExampleSection title="Use Case: Stats Dashboard">
        <Grid columns={4} gap="4">
          {[
            { label: 'Users', value: '12,345' },
            { label: 'Revenue', value: '$45,678' },
            { label: 'Orders', value: '1,234' },
            { label: 'Growth', value: '+23%' },
          ].map((stat, i) => (
            <Box key={i} padding="4" bg="bg.subtle" borderRadius="md" textAlign="center">
              <Text fontSize="xl" fontWeight="bold">
                {stat.value}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {stat.label}
              </Text>
            </Box>
          ))}
        </Grid>
      </ExampleSection>
    </Flex.V>
  );
};
