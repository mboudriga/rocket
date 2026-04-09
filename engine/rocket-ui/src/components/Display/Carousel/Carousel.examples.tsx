import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Carousel, CarouselItem } from './Carousel';

const slideColors = [
  'blue.subtle',
  'green.subtle',
  'purple.subtle',
  'orange.subtle',
  'pink.subtle',
];

export const CarouselExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box maxWidth="400px">
          <Carousel slideCount={3} aria-label="Basic carousel">
            {slideColors.slice(0, 3).map((color, index) => (
              <CarouselItem key={index} index={index}>
                <Box
                  height="200px"
                  bg={color}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontWeight="semibold">Slide {index + 1}</Text>
                </Box>
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      </ExampleSection>

      {/* Multiple slides per view */}
      <ExampleSection title="Multiple Slides Per View">
        <Box maxWidth="600px">
          <Carousel slideCount={5} slidesPerView={2} gap="16px" aria-label="Multiple slides per view carousel">
            {slideColors.map((color, index) => (
              <CarouselItem key={index} index={index}>
                <Box
                  height="150px"
                  bg={color}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontWeight="semibold">Slide {index + 1}</Text>
                </Box>
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      </ExampleSection>

      {/* Loop enabled */}
      <ExampleSection title="Loop Enabled">
        <Box maxWidth="400px">
          <Carousel slideCount={3} loop aria-label="Loop enabled carousel">
            {slideColors.slice(0, 3).map((color, index) => (
              <CarouselItem key={index} index={index}>
                <Box
                  height="200px"
                  bg={color}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontWeight="semibold">Slide {index + 1}</Text>
                </Box>
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      </ExampleSection>

      {/* Without controls */}
      <ExampleSection title="Without Controls">
        <Box maxWidth="400px">
          <Carousel slideCount={3} showControls={false} aria-label="Carousel without controls">
            {slideColors.slice(0, 3).map((color, index) => (
              <CarouselItem key={index} index={index}>
                <Box
                  height="150px"
                  bg={color}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontWeight="semibold">Slide {index + 1}</Text>
                </Box>
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      </ExampleSection>

      {/* Without indicators */}
      <ExampleSection title="Without Indicators">
        <Box maxWidth="400px">
          <Carousel slideCount={3} showIndicators={false} aria-label="Carousel without indicators">
            {slideColors.slice(0, 3).map((color, index) => (
              <CarouselItem key={index} index={index}>
                <Box
                  height="150px"
                  bg={color}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontWeight="semibold">Slide {index + 1}</Text>
                </Box>
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      </ExampleSection>

      {/* Use case: Product showcase */}
      <ExampleSection title="Use Case: Product Showcase">
        <Box maxWidth="700px">
          <Carousel slideCount={4} slidesPerView={3} gap="12px" loop aria-label="Product showcase carousel">
            {['Product A', 'Product B', 'Product C', 'Product D'].map((name, index) => (
              <CarouselItem key={index} index={index}>
                <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg">
                  <Box height="120px" bg="bg.subtle" borderRadius="md" marginBottom="3" />
                  <Text fontWeight="semibold" fontSize="sm">
                    {name}
                  </Text>
                  <Text fontSize="sm" color="fg.muted">
                    $99.00
                  </Text>
                </Box>
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
