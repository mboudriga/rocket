import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Badge } from './Badge';

describe('<Badge />', () => {
  it('renders with default props', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  describe('sizes', () => {
    it('renders with xs size', () => {
      render(<Badge size="xs">XS Badge</Badge>);
      expect(screen.getByText('XS Badge')).toBeInTheDocument();
    });

    it('renders with sm size', () => {
      render(<Badge size="sm">SM Badge</Badge>);
      expect(screen.getByText('SM Badge')).toBeInTheDocument();
    });

    it('renders with md size (default)', () => {
      render(<Badge size="md">MD Badge</Badge>);
      expect(screen.getByText('MD Badge')).toBeInTheDocument();
    });

    it('renders with lg size', () => {
      render(<Badge size="lg">LG Badge</Badge>);
      expect(screen.getByText('LG Badge')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders with solid variant', () => {
      render(<Badge variant="solid">Solid Badge</Badge>);
      expect(screen.getByText('Solid Badge')).toBeInTheDocument();
    });

    it('renders with subtle variant (default)', () => {
      render(<Badge variant="subtle">Subtle Badge</Badge>);
      expect(screen.getByText('Subtle Badge')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Badge variant="outline">Outline Badge</Badge>);
      expect(screen.getByText('Outline Badge')).toBeInTheDocument();
    });

    it('renders with surface variant', () => {
      render(<Badge variant="surface">Surface Badge</Badge>);
      expect(screen.getByText('Surface Badge')).toBeInTheDocument();
    });

    it('renders with plain variant', () => {
      render(<Badge variant="plain">Plain Badge</Badge>);
      expect(screen.getByText('Plain Badge')).toBeInTheDocument();
    });
  });

  describe('colorPalette', () => {
    it('renders with blue colorPalette (default)', () => {
      render(<Badge colorPalette="blue">Blue Badge</Badge>);
      expect(screen.getByText('Blue Badge')).toBeInTheDocument();
    });

    it('renders with red colorPalette', () => {
      render(<Badge colorPalette="red">Red Badge</Badge>);
      expect(screen.getByText('Red Badge')).toBeInTheDocument();
    });

    it('renders with green colorPalette', () => {
      render(<Badge colorPalette="green">Green Badge</Badge>);
      expect(screen.getByText('Green Badge')).toBeInTheDocument();
    });

    it('renders with gray colorPalette', () => {
      render(<Badge colorPalette="gray">Gray Badge</Badge>);
      expect(screen.getByText('Gray Badge')).toBeInTheDocument();
    });
  });

  describe('combined props', () => {
    it('renders with size and variant combination', () => {
      render(
        <Badge size="lg" variant="solid" colorPalette="red">
          Large Solid Red
        </Badge>
      );
      expect(screen.getByText('Large Solid Red')).toBeInTheDocument();
    });

    it('renders with xs size and outline variant', () => {
      render(
        <Badge size="xs" variant="outline">
          XS Outline
        </Badge>
      );
      expect(screen.getByText('XS Outline')).toBeInTheDocument();
    });

    it('renders with sm size and surface variant', () => {
      render(
        <Badge size="sm" variant="surface">
          SM Surface
        </Badge>
      );
      expect(screen.getByText('SM Surface')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Badge>Accessible Badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with outline variant', async () => {
      const { container } = render(<Badge variant="outline">Outline Badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Badge className="custom-class" data-testid="test">
          Badge
        </Badge>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
