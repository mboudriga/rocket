import type { Carousel as ArkCarousel } from '@ark-ui/react/carousel';
import type { HTMLChakraProps } from '@chakra-ui/react';

export interface CarouselProps extends Omit<HTMLChakraProps<'div'>, 'defaultValue' | 'page'> {
  slideCount: number;
  slidesPerView?: number;
  /** Gap between slides. Follows Rocket UI convention (use `gap` instead of `spacing`). */
  gap?: string | number;
  loop?: boolean;
  orientation?: 'horizontal' | 'vertical';
  showIndicators?: boolean;
  showControls?: boolean;
  defaultPage?: number;
  page?: number;
  onPageChange?: (details: ArkCarousel.PageChangeDetails) => void;
}

export const CarouselDefaultProps: Partial<CarouselProps> = {
  slidesPerView: 1,
  gap: '16px',
  loop: false,
  orientation: 'horizontal',
  showIndicators: true,
  showControls: true,
};
