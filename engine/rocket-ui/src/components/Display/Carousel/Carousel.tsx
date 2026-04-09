import { Carousel as ArkCarousel } from '@ark-ui/react/carousel';
import { Box, Center, IconButton } from '@chakra-ui/react';
import { Flex } from '@components/Layout/Flex';
import { useMemo } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import { CarouselDefaultProps, type CarouselProps } from './Carousel.types';

const Carousel = ({
  ref,
  slideCount,
  slidesPerView = CarouselDefaultProps.slidesPerView,
  gap = CarouselDefaultProps.gap,
  loop = CarouselDefaultProps.loop,
  orientation = CarouselDefaultProps.orientation,
  showIndicators = CarouselDefaultProps.showIndicators,
  showControls = CarouselDefaultProps.showControls,
  defaultPage,
  page,
  onPageChange,
  children,
  'aria-label': ariaLabel,
  ...props
}: CarouselProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const pageCount = Math.ceil(slideCount / (slidesPerView ?? 1));
  const pageIndices = useMemo(() => Array.from({ length: pageCount }, (_, i) => i), [pageCount]);

  // Map `gap` to Ark UI's `spacing` prop
  const arkSpacing = typeof gap === 'number' ? `${gap}px` : gap;

  return (
    <ArkCarousel.Root
      ref={ref}
      aria-label={ariaLabel}
      slideCount={slideCount}
      slidesPerPage={slidesPerView}
      spacing={arkSpacing}
      loop={loop}
      orientation={orientation}
      defaultPage={defaultPage}
      page={page}
      onPageChange={onPageChange}
    >
      <Box position="relative" {...props}>
        <Box overflow="hidden" borderRadius="md">
          <ArkCarousel.ItemGroup>{children}</ArkCarousel.ItemGroup>
        </Box>

        {showControls && (
          <>
            <ArkCarousel.PrevTrigger asChild>
              <IconButton
                aria-label="Previous slide"
                position="absolute"
                left="2"
                top="50%"
                transform="translateY(-50%)"
                size="sm"
                variant="solid"
                colorPalette="gray"
                borderRadius="full"
                zIndex={1}
              >
                <LuChevronLeft />
              </IconButton>
            </ArkCarousel.PrevTrigger>

            <ArkCarousel.NextTrigger asChild>
              <IconButton
                aria-label="Next slide"
                position="absolute"
                right="2"
                top="50%"
                transform="translateY(-50%)"
                size="sm"
                variant="solid"
                colorPalette="gray"
                borderRadius="full"
                zIndex={1}
              >
                <LuChevronRight />
              </IconButton>
            </ArkCarousel.NextTrigger>
          </>
        )}
      </Box>

      {showIndicators && (
        <ArkCarousel.IndicatorGroup asChild>
          <Center marginTop="4" width="100%">
            <Flex.H gap="2" justify="center">
              {pageIndices.map((idx) => (
                <ArkCarousel.Indicator key={idx} index={idx} asChild>
                  <Box
                    as="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    width="2"
                    height="2"
                    borderRadius="full"
                    cursor="pointer"
                    transition="all 0.2s"
                    bg="fg.subtle"
                    _hover={{ bg: 'fg.muted' }}
                    css={{
                      '&[data-current]': {
                        background: 'var(--chakra-colors-fg)',
                        transform: 'scale(1.2)',
                      },
                    }}
                  />
                </ArkCarousel.Indicator>
              ))}
            </Flex.H>
          </Center>
        </ArkCarousel.IndicatorGroup>
      )}
    </ArkCarousel.Root>
  );
};

// Re-export Ark UI Carousel parts for compound component usage
const CarouselItem = ArkCarousel.Item;

export { Carousel, CarouselItem };
