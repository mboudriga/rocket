import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Code } from './Code';

describe('<Code />', () => {
  it('renders with default props', () => {
    render(<Code>const x = 1</Code>);
    expect(screen.getByText('const x = 1')).toBeInTheDocument();
  });

  describe('sizes', () => {
    it('renders with xs size', () => {
      render(<Code size="xs">xs code</Code>);
      expect(screen.getByText('xs code')).toBeInTheDocument();
    });

    it('renders with sm size (default)', () => {
      render(<Code size="sm">sm code</Code>);
      expect(screen.getByText('sm code')).toBeInTheDocument();
    });

    it('renders with md size', () => {
      render(<Code size="md">md code</Code>);
      expect(screen.getByText('md code')).toBeInTheDocument();
    });

    it('renders with lg size', () => {
      render(<Code size="lg">lg code</Code>);
      expect(screen.getByText('lg code')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders with solid variant', () => {
      render(<Code variant="solid">solid code</Code>);
      expect(screen.getByText('solid code')).toBeInTheDocument();
    });

    it('renders with subtle variant (default)', () => {
      render(<Code variant="subtle">subtle code</Code>);
      expect(screen.getByText('subtle code')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Code variant="outline">outline code</Code>);
      expect(screen.getByText('outline code')).toBeInTheDocument();
    });

    it('renders with surface variant', () => {
      render(<Code variant="surface">surface code</Code>);
      expect(screen.getByText('surface code')).toBeInTheDocument();
    });

    it('renders with plain variant', () => {
      render(<Code variant="plain">plain code</Code>);
      expect(screen.getByText('plain code')).toBeInTheDocument();
    });
  });

  describe('colorPalette', () => {
    it('renders with gray colorPalette (default)', () => {
      render(<Code colorPalette="gray">gray code</Code>);
      expect(screen.getByText('gray code')).toBeInTheDocument();
    });

    it('renders with blue colorPalette', () => {
      render(<Code colorPalette="blue">blue code</Code>);
      expect(screen.getByText('blue code')).toBeInTheDocument();
    });

    it('renders with red colorPalette', () => {
      render(<Code colorPalette="red">red code</Code>);
      expect(screen.getByText('red code')).toBeInTheDocument();
    });

    it('renders with green colorPalette', () => {
      render(<Code colorPalette="green">green code</Code>);
      expect(screen.getByText('green code')).toBeInTheDocument();
    });
  });

  describe('combined props', () => {
    it('renders with size, variant and colorPalette combination', () => {
      render(
        <Code size="lg" variant="solid" colorPalette="blue">
          styled code
        </Code>
      );
      expect(screen.getByText('styled code')).toBeInTheDocument();
    });

    it('renders with xs size and outline variant', () => {
      render(
        <Code size="xs" variant="outline">
          small outline
        </Code>
      );
      expect(screen.getByText('small outline')).toBeInTheDocument();
    });
  });

  describe('content', () => {
    it('renders code snippets', () => {
      render(<Code>function hello() {'{}'}</Code>);
      expect(screen.getByText(/function hello/)).toBeInTheDocument();
    });

    it('renders with special characters', () => {
      render(<Code>{'<div>Hello</div>'}</Code>);
      expect(screen.getByText('<div>Hello</div>')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Code>const x = 1</Code>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with outline variant', async () => {
      const { container } = render(<Code variant="outline">const x = 1</Code>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLElement>();
      render(<Code ref={ref}>code</Code>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Code className="custom-class" data-testid="test">
          code
        </Code>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
