import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Image } from '@components/Media/Image';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { AspectRatio } from './AspectRatio';

export const AspectRatioExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic (4:3)">
        <AspectRatio ratio={4 / 3} maxWidth="300px">
          <Image src="https://picsum.photos/400/300" alt="4:3 aspect ratio" objectFit="cover" />
        </AspectRatio>
      </ExampleSection>

      {/* Common ratios */}
      <ExampleSection title="Common Aspect Ratios">
        <Flex.H gap="4" wrap="wrap">
          {[
            { ratio: 1, label: '1:1 (Square)' },
            { ratio: 4 / 3, label: '4:3' },
            { ratio: 16 / 9, label: '16:9' },
            { ratio: 21 / 9, label: '21:9 (Ultrawide)' },
          ].map(({ ratio, label }) => (
            <Box key={label} width="180px">
              <AspectRatio ratio={ratio}>
                <Box
                  bg="bg.muted"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="sm" color="fg.muted">
                    {label}
                  </Text>
                </Box>
              </AspectRatio>
              <Text fontSize="xs" color="fg.muted" marginTop="1" textAlign="center">
                {label}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Portrait ratios */}
      <ExampleSection title="Portrait Ratios">
        <Flex.H gap="4" wrap="wrap" align="start">
          {[
            { ratio: 3 / 4, label: '3:4' },
            { ratio: 2 / 3, label: '2:3' },
            { ratio: 9 / 16, label: '9:16' },
          ].map(({ ratio, label }) => (
            <Box key={label} width="100px">
              <AspectRatio ratio={ratio}>
                <Box
                  bg="purple.subtle"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="xs" color="purple.fg">
                    {label}
                  </Text>
                </Box>
              </AspectRatio>
              <Text fontSize="xs" color="fg.muted" marginTop="1" textAlign="center">
                {label}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* With images */}
      <ExampleSection title="With Images">
        <Flex.H gap="4" wrap="wrap">
          <Box width="200px">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="https://picsum.photos/400/225"
                alt="Landscape image"
                objectFit="cover"
                borderRadius="md"
              />
            </AspectRatio>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              16:9 Landscape
            </Text>
          </Box>
          <Box width="150px">
            <AspectRatio ratio={1}>
              <Image
                src="https://picsum.photos/200/200"
                alt="Square image"
                objectFit="cover"
                borderRadius="md"
              />
            </AspectRatio>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              1:1 Square
            </Text>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* With video embed (placeholder) */}
      <ExampleSection title="Video Embed Container (16:9)">
        <AspectRatio ratio={16 / 9} maxWidth="500px">
          <Box
            bg="gray.solid"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Flex.V align="center" gap="2">
              <Box
                width="60px"
                height="60px"
                borderRadius="full"
                bg="bg/20"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  width="0"
                  height="0"
                  borderLeft="20px solid"
                  borderLeftColor="gray.contrast"
                  borderTop="12px solid transparent"
                  borderBottom="12px solid transparent"
                  marginLeft="4px"
                />
              </Box>
              <Text color="gray.contrast" fontSize="sm">
                Video Player
              </Text>
            </Flex.V>
          </Box>
        </AspectRatio>
      </ExampleSection>

      {/* With map placeholder */}
      <ExampleSection title="Map Container (16:9)">
        <AspectRatio ratio={16 / 9} maxWidth="500px">
          <Box
            bg="green.subtle"
            borderRadius="lg"
            border="1px solid"
            borderColor="green.subtle"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Flex.V align="center" gap="1">
              <Text color="green.fg" fontSize="2xl">
                📍
              </Text>
              <Text color="green.fg" fontSize="sm">
                Map Embed Area
              </Text>
            </Flex.V>
          </Box>
        </AspectRatio>
      </ExampleSection>

      <Divider />

      {/* Use case: Image gallery grid */}
      <ExampleSection title="Use Case: Image Gallery">
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="4" maxWidth="500px">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <AspectRatio key={num} ratio={1}>
              <Image
                src={`https://picsum.photos/200/200?random=${num}`}
                alt={`Gallery image ${num}`}
                objectFit="cover"
                borderRadius="md"
              />
            </AspectRatio>
          ))}
        </Box>
      </ExampleSection>

      {/* Use case: Card with consistent image */}
      <ExampleSection title="Use Case: Product Cards">
        <Flex.H gap="4" wrap="wrap">
          {[
            { name: 'Product A', price: '$29.99' },
            { name: 'Product B', price: '$49.99' },
            { name: 'Product C', price: '$19.99' },
          ].map((product, index) => (
            <Box
              key={product.name}
              width="150px"
              border="1px solid"
              borderColor="border"
              borderRadius="lg"
              overflow="hidden"
            >
              <AspectRatio ratio={1}>
                <Image
                  src={`https://picsum.photos/200/200?random=product${index}`}
                  alt={product.name}
                  objectFit="cover"
                />
              </AspectRatio>
              <Box padding="3">
                <Text fontSize="sm" fontWeight="medium">
                  {product.name}
                </Text>
                <Text fontSize="sm" color="green.fg">
                  {product.price}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Use case: Thumbnail grid */}
      <ExampleSection title="Use Case: Video Thumbnails">
        <Flex.H gap="3" wrap="wrap">
          {[
            { title: 'Introduction', duration: '5:30' },
            { title: 'Getting Started', duration: '12:45' },
            { title: 'Advanced Tips', duration: '8:20' },
          ].map((video, index) => (
            <Box key={video.title} width="180px">
              <Box position="relative">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={`https://picsum.photos/320/180?random=video${index}`}
                    alt={video.title}
                    objectFit="cover"
                    borderRadius="md"
                  />
                </AspectRatio>
                <Box
                  position="absolute"
                  bottom="2"
                  right="2"
                  bg="gray.900"
                  paddingX="1"
                  borderRadius="sm"
                >
                  <Text fontSize="xs" color="gray.contrast">
                    {video.duration}
                  </Text>
                </Box>
              </Box>
              <Text fontSize="sm" marginTop="1" lineClamp={1}>
                {video.title}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
