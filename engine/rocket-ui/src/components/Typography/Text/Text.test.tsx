import { createRef } from 'react';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Text } from './Text';

describe('<Text />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Text>Hello World</Text>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(<Text>This is a paragraph of text.</Text>);
      expect(screen.getByText('This is a paragraph of text.')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Text className="custom-text">Custom Text</Text>);
      expect(screen.getByText('Custom Text')).toHaveClass('custom-text');
    });
  });

  describe('semantic elements', () => {
    it('renders as div by default', () => {
      render(<Text>Default element</Text>);
      expect(screen.getByText('Default element').tagName).toBe('DIV');
    });

    it('renders as paragraph when as="p"', () => {
      render(<Text as="p">Paragraph text</Text>);
      expect(screen.getByText('Paragraph text').tagName).toBe('P');
    });

    it('renders as span when as="span"', () => {
      render(<Text as="span">Span text</Text>);
      expect(screen.getByText('Span text').tagName).toBe('SPAN');
    });
  });

  describe('text sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders with textStyle="%s"', (textStyle) => {
      render(<Text textStyle={textStyle}>{textStyle} text</Text>);
      expect(screen.getByText(`${textStyle} text`)).toBeInTheDocument();
    });
  });

  describe('highlight feature', () => {
    it('renders text with highlight', () => {
      render(
        <Text
          highlight={{
            query: 'important',
            styles: { fontWeight: 'bold' },
          }}
        >
          This is an important message.
        </Text>
      );
      expect(screen.getByText(/This is an/)).toBeInTheDocument();
    });

    it('renders without highlight when not provided', () => {
      render(<Text>Plain text without highlight</Text>);
      expect(screen.getByText('Plain text without highlight')).toBeInTheDocument();
    });
  });

  describe('tooltip feature', () => {
    it('renders text with tooltip trigger', () => {
      render(<Text tooltip="This is a tooltip">Text with tooltip</Text>);
      expect(screen.getByText('Text with tooltip')).toBeInTheDocument();
    });

    it('shows tooltip on hover', async () => {
      const { user } = render(<Text tooltip="Helpful information">Hover me</Text>);

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText('Helpful information')).toBeInTheDocument();
      });
    });

    it('renders text even when tooltipDisabled is true', () => {
      render(
        <Text tooltip="Hidden tooltip" tooltipDisabled>
          Cannot show tooltip
        </Text>
      );

      expect(screen.getByText('Cannot show tooltip')).toBeInTheDocument();
    });
  });

  describe('text truncation', () => {
    it('supports lineClamp prop', () => {
      render(<Text lineClamp={2}>Long text that should be clamped to two lines</Text>);
      expect(screen.getByText(/Long text/)).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Text ref={ref}>Text</Text>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Text className="custom-class" data-testid="test">
          Text
        </Text>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
