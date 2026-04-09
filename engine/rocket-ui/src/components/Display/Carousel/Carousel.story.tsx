import { Box } from '@components/Layout/Box';
import { Center } from '@components/Layout/Center';
import { Text } from '@components/Typography/Text';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { FC } from 'react';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Carousel, CarouselItem } from './Carousel';
import { CarouselExamples } from './Carousel.examples';
import { CarouselDefaultProps, type CarouselProps } from './Carousel.types';

/* --- [ DOCUMENTATION ] --- */

const DESCRIPTION = `Horizontally scrollable slide container with controls and indicators.`;

const MESSAGE = ``;

const NOTATIONS: Array<string> = [];

const USE = {
  good: [
    'Image galleries and slideshows',
    'Product photo viewers',
    'Testimonial or review carousels',
    'Feature highlight sliders',
    'Card-based content browsing',
  ],
  bad: [
    'Scrollable lists (use ScrollArea)',
    'Tab-based content (use Tabs)',
    'Grid galleries (use Grid)',
    'Single image display (use Image)',
    'Paginated data (use Table with pagination)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

const LAYOUT = 'normal';

export const Component: StoryObj<typeof Carousel> = (args: CarouselProps) => (
  <CarouselConstructor {...args} />
);

Component.storyName = 'Carousel';

const INITIAL_PROPS = {
  slideCount: 5,
  slidesPerView: 1,
};

const DISABLED_PROPS = {
  children: { control: false },
};

export default {
  title: 'Components/Display/Carousel',
  component: Carousel,
  args: { ...CarouselDefaultProps, ...INITIAL_PROPS, onPageChange: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Carousel.test.tsx',
      testResults: vitestResults,
    },
  },
  decorators: [
    (story, meta) => (
      <StoryTemplate
        meta={meta}
        layout={LAYOUT}
        description={DESCRIPTION}
        message={MESSAGE}
        notations={NOTATIONS}
        use={USE}
        examples={<CarouselExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Carousel>;

/* --- [ CUSTOM RENDERING ] --- */

const slideColors = ['blue.500', 'green.500', 'purple.500', 'orange.500', 'pink.500'];

const CarouselConstructor: FC<CarouselProps> = ({ slideCount, ...args }) => {
  return (
    <Box maxWidth="500px" margin="0 auto">
      <Carousel slideCount={slideCount} aria-label="Demo carousel" {...args}>
        {Array.from({ length: slideCount }, (_, i) => (
          <CarouselItem key={i} index={i}>
            <Center
              height="200px"
              bg={slideColors[i % slideColors.length]}
              color="white"
              borderRadius="md"
            >
              <Text fontSize="2xl" fontWeight="bold">
                Slide {i + 1}
              </Text>
            </Center>
          </CarouselItem>
        ))}
      </Carousel>
    </Box>
  );
};
