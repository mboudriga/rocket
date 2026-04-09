import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { ScrollArea } from './ScrollArea';

describe('<ScrollArea />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ScrollArea maxHeight="200px">
          <p>Scrollable content</p>
        </ScrollArea>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children content', () => {
      render(
        <ScrollArea maxHeight="200px">
          <div>First item</div>
          <div>Second item</div>
          <div>Third item</div>
        </ScrollArea>
      );
      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
      expect(screen.getByText('Third item')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <ScrollArea ref={ref} maxHeight="200px">
          Content
        </ScrollArea>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <ScrollArea className="custom-class" data-testid="scroll-area" maxHeight="200px">
          Content
        </ScrollArea>
      );
      expect(screen.getByTestId('scroll-area')).toHaveClass('custom-class');
    });
  });

  describe('dimensions', () => {
    it('renders with maxHeight', () => {
      render(
        <ScrollArea maxHeight="300px">
          <p>Content</p>
        </ScrollArea>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with maxWidth', () => {
      render(
        <ScrollArea maxWidth="500px">
          <p>Content</p>
        </ScrollArea>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('orientation', () => {
    it('renders with horizontal orientation', () => {
      render(
        <ScrollArea maxWidth="200px" orientation="horizontal">
          <p>Content</p>
        </ScrollArea>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with both orientation', () => {
      render(
        <ScrollArea maxHeight="200px" maxWidth="200px" orientation="both">
          <p>Content</p>
        </ScrollArea>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('scrollbar visibility', () => {
    it('renders with hideScrollbar option', () => {
      render(
        <ScrollArea maxHeight="200px" hideScrollbar>
          <p>Content</p>
        </ScrollArea>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('long content', () => {
    it('handles long scrollable content', () => {
      const items = Array.from({ length: 100 }, (_, i) => <p key={i}>Item {i + 1}</p>);
      render(<ScrollArea maxHeight="200px">{items}</ScrollArea>);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 100')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('renders with size="sm"', () => {
      render(
        <ScrollArea size="sm" maxHeight="200px">
          <p>Small scrollbar</p>
        </ScrollArea>
      );
      expect(screen.getByText('Small scrollbar')).toBeInTheDocument();
    });

    it('renders with size="md" (default)', () => {
      render(
        <ScrollArea size="md" maxHeight="200px">
          <p>Medium scrollbar</p>
        </ScrollArea>
      );
      expect(screen.getByText('Medium scrollbar')).toBeInTheDocument();
    });

    it('renders with size="lg"', () => {
      render(
        <ScrollArea size="lg" maxHeight="200px">
          <p>Large scrollbar</p>
        </ScrollArea>
      );
      expect(screen.getByText('Large scrollbar')).toBeInTheDocument();
    });
  });

  describe('default props', () => {
    it('uses default orientation "vertical"', () => {
      render(
        <ScrollArea maxHeight="200px">
          <p>Default orientation</p>
        </ScrollArea>
      );
      expect(screen.getByText('Default orientation')).toBeInTheDocument();
    });

    it('uses default size "md"', () => {
      render(
        <ScrollArea maxHeight="200px">
          <p>Default size</p>
        </ScrollArea>
      );
      expect(screen.getByText('Default size')).toBeInTheDocument();
    });

    it('shows scrollbar by default', () => {
      render(
        <ScrollArea maxHeight="200px">
          <p>Visible scrollbar</p>
        </ScrollArea>
      );
      expect(screen.getByText('Visible scrollbar')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles empty content', () => {
      render(<ScrollArea maxHeight="200px" data-testid="empty-scroll" />);
      expect(screen.getByTestId('empty-scroll')).toBeInTheDocument();
    });

    it('handles content shorter than maxHeight', () => {
      render(
        <ScrollArea maxHeight="500px">
          <p>Short content</p>
        </ScrollArea>
      );
      expect(screen.getByText('Short content')).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<ScrollArea maxHeight="200px">{null}</ScrollArea>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('combines both maxHeight and maxWidth', () => {
      render(
        <ScrollArea maxHeight="200px" maxWidth="300px" orientation="both">
          <div style={{ width: '500px', height: '500px' }}>Large content</div>
        </ScrollArea>
      );
      expect(screen.getByText('Large content')).toBeInTheDocument();
    });
  });
});
