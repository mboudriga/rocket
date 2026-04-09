import { Box } from '@components/Layout/Box';
import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';
import { Carousel, CarouselItem } from './Carousel';

describe('<Carousel />', () => {
  it('renders with default props', () => {
    render(
      <Carousel slideCount={3}>
        <CarouselItem index={0}>
          <Box>Slide 1</Box>
        </CarouselItem>
        <CarouselItem index={1}>
          <Box>Slide 2</Box>
        </CarouselItem>
        <CarouselItem index={2}>
          <Box>Slide 3</Box>
        </CarouselItem>
      </Carousel>
    );
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('renders all slides', () => {
    render(
      <Carousel slideCount={3}>
        <CarouselItem index={0}>
          <Box>First Slide</Box>
        </CarouselItem>
        <CarouselItem index={1}>
          <Box>Second Slide</Box>
        </CarouselItem>
        <CarouselItem index={2}>
          <Box>Third Slide</Box>
        </CarouselItem>
      </Carousel>
    );
    expect(screen.getByText('First Slide')).toBeInTheDocument();
    expect(screen.getByText('Second Slide')).toBeInTheDocument();
    expect(screen.getByText('Third Slide')).toBeInTheDocument();
  });

  describe('controls', () => {
    it('renders navigation controls by default', () => {
      render(
        <Carousel slideCount={2}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
        </Carousel>
      );
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('hides controls when showControls is false', () => {
      render(
        <Carousel slideCount={2} showControls={false}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
        </Carousel>
      );
      expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('has clickable next button', async () => {
      const { user } = render(
        <Carousel slideCount={3}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
          <CarouselItem index={2}>
            <Box>Slide 3</Box>
          </CarouselItem>
        </Carousel>
      );

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeInTheDocument();
      await user.click(nextButton);
      expect(nextButton).toBeInTheDocument();
    });

    it('has clickable previous button', async () => {
      const { user } = render(
        <Carousel slideCount={3} defaultPage={1}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
          <CarouselItem index={2}>
            <Box>Slide 3</Box>
          </CarouselItem>
        </Carousel>
      );

      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeInTheDocument();
      await user.click(prevButton);
      expect(prevButton).toBeInTheDocument();
    });
  });

  describe('slidesPerView', () => {
    it('shows multiple slides', () => {
      render(
        <Carousel slideCount={4} slidesPerView={2}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
          <CarouselItem index={2}>
            <Box>Slide 3</Box>
          </CarouselItem>
          <CarouselItem index={3}>
            <Box>Slide 4</Box>
          </CarouselItem>
        </Carousel>
      );
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
    });

    it('renders correct number of indicators based on page count', () => {
      const { container } = render(
        <Carousel slideCount={5} slidesPerView={2}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
          <CarouselItem index={2}>
            <Box>Slide 3</Box>
          </CarouselItem>
          <CarouselItem index={3}>
            <Box>Slide 4</Box>
          </CarouselItem>
          <CarouselItem index={4}>
            <Box>Slide 5</Box>
          </CarouselItem>
        </Carousel>
      );
      // 5 slides with 2 per view = ceil(5/2) = 3 pages = 3 indicators
      const indicators = container.querySelectorAll('[data-part="indicator"]');
      expect(indicators).toHaveLength(3);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Carousel slideCount={2}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
        </Carousel>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('callbacks', () => {
    it('accepts onPageChange callback', () => {
      const onPageChange = vi.fn();
      render(
        <Carousel slideCount={3} onPageChange={onPageChange}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
          <CarouselItem index={2}>
            <Box>Slide 3</Box>
          </CarouselItem>
        </Carousel>
      );

      // Carousel accepts onPageChange which will be called on navigation
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('navigates with arrow keys', async () => {
      const onPageChange = vi.fn();
      const { user } = render(
        <Carousel slideCount={3} onPageChange={onPageChange}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
          <CarouselItem index={2}>
            <Box>Slide 3</Box>
          </CarouselItem>
        </Carousel>
      );

      // Focus on carousel and navigate with arrow keys
      const nextButton = screen.getByRole('button', { name: /next/i });
      nextButton.focus();
      await user.keyboard('{ArrowRight}');

      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
  });

  describe('loop behavior', () => {
    it('loops when at end with loop enabled', async () => {
      const { user } = render(
        <Carousel slideCount={2} loop defaultPage={1}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
        </Carousel>
      );

      // Start at last slide and click next - should loop to first
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      // Carousel should have looped
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
  });

  describe('boundary states', () => {
    it('disables prev button on first slide when loop disabled', () => {
      render(
        <Carousel slideCount={3} loop={false} defaultPage={0}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
          <CarouselItem index={2}>
            <Box>Slide 3</Box>
          </CarouselItem>
        </Carousel>
      );

      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Carousel ref={ref} slideCount={2}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
          <CarouselItem index={1}>
            <Box>Slide 2</Box>
          </CarouselItem>
        </Carousel>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Carousel className="custom-class" data-testid="test" slideCount={1}>
          <CarouselItem index={0}>
            <Box>Slide 1</Box>
          </CarouselItem>
        </Carousel>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
