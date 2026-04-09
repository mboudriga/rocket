import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Image } from './Image';

export const ImageExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Image src="https://picsum.photos/300/200" alt="Random placeholder" borderRadius="md" />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" align="end" wrap="wrap">
          <Box>
            <Image
              src="https://picsum.photos/100/100"
              alt="Small"
              width="100px"
              height="100px"
              borderRadius="md"
            />
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              100x100
            </Text>
          </Box>
          <Box>
            <Image
              src="https://picsum.photos/150/150"
              alt="Medium"
              width="150px"
              height="150px"
              borderRadius="md"
            />
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              150x150
            </Text>
          </Box>
          <Box>
            <Image
              src="https://picsum.photos/200/200"
              alt="Large"
              width="200px"
              height="200px"
              borderRadius="md"
            />
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              200x200
            </Text>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Border radius */}
      <ExampleSection title="Border Radius">
        <Flex.H gap="4" align="center" wrap="wrap">
          {(['none', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
            <Box key={radius} textAlign="center">
              <Image
                src="https://picsum.photos/100/100?random=1"
                alt={`${radius} radius`}
                width="80px"
                height="80px"
                borderRadius={radius}
              />
              <Text fontSize="xs" color="fg.muted" marginTop="1">
                {radius}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Object fit */}
      <ExampleSection title="Object Fit">
        <Flex.H gap="4" wrap="wrap">
          {(['cover', 'contain', 'fill', 'none'] as const).map((fit) => (
            <Box key={fit} textAlign="center">
              <Box
                width="120px"
                height="120px"
                border="1px dashed"
                borderColor="border"
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src="https://picsum.photos/200/300"
                  alt={`${fit} example`}
                  width="100%"
                  height="100%"
                  objectFit={fit}
                />
              </Box>
              <Text fontSize="xs" color="fg.muted" marginTop="1">
                {fit}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Various image sources */}
      <ExampleSection title="Image Sources">
        <Flex.H gap="4">
          <Box>
            <Image
              src="https://picsum.photos/150/100?random=1"
              alt="Random image 1"
              width="150px"
              height="100px"
              borderRadius="md"
            />
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              Random 1
            </Text>
          </Box>
          <Box>
            <Image
              src="https://picsum.photos/150/100?random=2"
              alt="Random image 2"
              width="150px"
              height="100px"
              borderRadius="md"
            />
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              Random 2
            </Text>
          </Box>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Product gallery */}
      <ExampleSection title="Use Case: Product Gallery">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4">
          <Flex.V gap="4">
            <Image
              src="https://picsum.photos/400/300?random=product"
              alt="Product main image"
              width="100%"
              height="200px"
              objectFit="cover"
              borderRadius="lg"
            />
            <Flex.H gap="2">
              {[1, 2, 3, 4].map((num) => (
                <Box
                  key={num}
                  flex="1"
                  border="2px solid"
                  borderColor={num === 1 ? 'blue.solid' : 'transparent'}
                  borderRadius="md"
                  overflow="hidden"
                  cursor="pointer"
                >
                  <Image
                    src={`https://picsum.photos/100/100?random=thumb${num}`}
                    alt={`Thumbnail ${num}`}
                    width="100%"
                    height="60px"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </Flex.H>
          </Flex.V>
        </Box>
      </ExampleSection>

      {/* Use case: Article card */}
      <ExampleSection title="Use Case: Article Card">
        <Box
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
          maxWidth="300px"
        >
          <Image
            src="https://picsum.photos/300/180?random=article"
            alt="Article cover"
            width="100%"
            height="150px"
            objectFit="cover"
          />
          <Box padding="4">
            <Text fontWeight="semibold" marginBottom="1">
              Getting Started with React
            </Text>
            <Text fontSize="sm" color="fg.muted" lineClamp={2}>
              Learn the fundamentals of React and how to build modern user interfaces with this
              powerful JavaScript library.
            </Text>
          </Box>
        </Box>
      </ExampleSection>

      {/* Use case: Avatar style */}
      <ExampleSection title="Use Case: Circular Image">
        <Flex.H gap="4" align="center">
          {[1, 2, 3, 4, 5].map((num) => (
            <Image
              key={num}
              src={`https://i.pravatar.cc/80?u=user${num}`}
              alt={`User ${num}`}
              width="60px"
              height="60px"
              borderRadius="full"
              objectFit="cover"
            />
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Use case: Hero image */}
      <ExampleSection title="Use Case: Hero Section">
        <Box
          borderRadius="lg"
          overflow="hidden"
          height="200px"
          backgroundImage="url(https://picsum.photos/600/200?random=hero)"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Box
            height="100%"
            bg="gray.900"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center" color="white">
              <Text fontSize="xl" fontWeight="bold">
                Welcome to Our Platform
              </Text>
              <Text fontSize="sm">Build something amazing today</Text>
            </Box>
          </Box>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
