import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Splitter } from './Splitter';

export const SplitterExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box
          height="200px"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          overflow="hidden"
        >
          <Splitter
            panels={[
              {
                id: 'left',
                defaultSize: 50,
                children: (
                  <Box padding="4" bg="blue.subtle" height="100%">
                    <Text fontWeight="semibold">Left Panel</Text>
                    <Text fontSize="sm" color="fg.muted">
                      Drag the divider to resize
                    </Text>
                  </Box>
                ),
              },
              {
                id: 'right',
                defaultSize: 50,
                children: (
                  <Box padding="4" bg="green.subtle" height="100%">
                    <Text fontWeight="semibold">Right Panel</Text>
                    <Text fontSize="sm" color="fg.muted">
                      This panel resizes with the left
                    </Text>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </ExampleSection>

      {/* Vertical orientation */}
      <ExampleSection title="Vertical Orientation">
        <Box
          height="300px"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          overflow="hidden"
        >
          <Splitter
            orientation="vertical"
            panels={[
              {
                id: 'top',
                defaultSize: 40,
                children: (
                  <Box padding="4" bg="purple.subtle" height="100%">
                    <Text fontWeight="semibold">Top Panel</Text>
                    <Text fontSize="sm" color="fg.muted">
                      Drag the horizontal divider
                    </Text>
                  </Box>
                ),
              },
              {
                id: 'bottom',
                defaultSize: 60,
                children: (
                  <Box padding="4" bg="orange.subtle" height="100%">
                    <Text fontWeight="semibold">Bottom Panel</Text>
                    <Text fontSize="sm" color="fg.muted">
                      Content area below
                    </Text>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </ExampleSection>

      {/* With min/max sizes */}
      <ExampleSection title="With Min/Max Constraints">
        <Box
          height="200px"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          overflow="hidden"
        >
          <Splitter
            panels={[
              {
                id: 'sidebar',
                defaultSize: 30,
                minSize: 20,
                maxSize: 40,
                children: (
                  <Box padding="4" bg="teal.subtle" height="100%">
                    <Text fontWeight="semibold">Sidebar</Text>
                    <Text fontSize="sm" color="fg.muted">
                      Min: 20%, Max: 40%
                    </Text>
                  </Box>
                ),
              },
              {
                id: 'content',
                defaultSize: 70,
                children: (
                  <Box padding="4" bg="bg.subtle" height="100%">
                    <Text fontWeight="semibold">Main Content</Text>
                    <Text fontSize="sm" color="fg.muted">
                      This panel takes the remaining space
                    </Text>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </ExampleSection>

      {/* Three panels */}
      <ExampleSection title="Three Panels">
        <Box
          height="200px"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          overflow="hidden"
        >
          <Splitter
            panels={[
              {
                id: 'nav',
                defaultSize: 20,
                children: (
                  <Box padding="3" bg="blue.subtle" height="100%">
                    <Text fontWeight="semibold" fontSize="sm">
                      Nav
                    </Text>
                  </Box>
                ),
              },
              {
                id: 'main',
                defaultSize: 50,
                children: (
                  <Box padding="3" bg="bg" height="100%">
                    <Text fontWeight="semibold" fontSize="sm">
                      Main
                    </Text>
                  </Box>
                ),
              },
              {
                id: 'aside',
                defaultSize: 30,
                children: (
                  <Box padding="3" bg="green.subtle" height="100%">
                    <Text fontWeight="semibold" fontSize="sm">
                      Aside
                    </Text>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </ExampleSection>

      <Divider />

      {/* Use case: Code editor layout */}
      <ExampleSection title="Use Case: Code Editor Layout">
        <Box
          height="300px"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          overflow="hidden"
        >
          <Splitter
            panels={[
              {
                id: 'file-tree',
                defaultSize: 25,
                minSize: 15,
                children: (
                  <Box bg="gray.solid" height="100%" padding="3">
                    <Text
                      color="gray.contrast"
                      fontSize="xs"
                      textTransform="uppercase"
                      marginBottom="2"
                    >
                      Explorer
                    </Text>
                    <Flex.V gap="1">
                      {['src/', '  index.ts', '  App.tsx', '  styles.css', 'package.json'].map(
                        (file) => (
                          <Text key={file} color="gray.contrast" fontSize="sm" fontFamily="mono">
                            {file}
                          </Text>
                        )
                      )}
                    </Flex.V>
                  </Box>
                ),
              },
              {
                id: 'editor',
                defaultSize: 75,
                children: (
                  <Box bg="gray.solid" height="100%" padding="3">
                    <Text color="gray.contrast" fontSize="xs" marginBottom="2">
                      index.ts
                    </Text>
                    <Text color="gray.contrast" fontSize="sm" fontFamily="mono">
                      const app = express();
                    </Text>
                    <Text color="gray.contrast" fontSize="sm" fontFamily="mono">
                      app.listen(3000);
                    </Text>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </ExampleSection>

      {/* Use case: Dashboard */}
      <ExampleSection title="Use Case: Dashboard">
        <Box
          height="250px"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          overflow="hidden"
        >
          <Splitter
            orientation="vertical"
            panels={[
              {
                id: 'charts',
                defaultSize: 60,
                children: (
                  <Box height="100%">
                    <Splitter
                      panels={[
                        {
                          id: 'chart1',
                          defaultSize: 50,
                          children: (
                            <Box
                              padding="4"
                              bg="bg"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text color="fg.muted">Chart 1</Text>
                            </Box>
                          ),
                        },
                        {
                          id: 'chart2',
                          defaultSize: 50,
                          children: (
                            <Box
                              padding="4"
                              bg="bg"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text color="fg.muted">Chart 2</Text>
                            </Box>
                          ),
                        },
                      ]}
                    />
                  </Box>
                ),
              },
              {
                id: 'table',
                defaultSize: 40,
                children: (
                  <Box padding="4" bg="bg.subtle" height="100%">
                    <Text fontWeight="semibold" marginBottom="2">
                      Data Table
                    </Text>
                    <Text fontSize="sm" color="fg.muted">
                      Table content here...
                    </Text>
                  </Box>
                ),
              },
            ]}
          />
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
