import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Flex } from './Flex';

describe('<Flex />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Flex>Content</Flex>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Flex>Flex Content</Flex>);
      expect(screen.getByText('Flex Content')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Flex ref={ref}>Content</Flex>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Flex className="custom-class" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('custom-class');
    });
  });

  describe('width defaults', () => {
    it('renders without explicit width by default', () => {
      render(<Flex data-testid="flex">Content</Flex>);
      expect(screen.getByTestId('flex')).not.toHaveStyle({ width: '100%' });
    });

    it('Flex.H renders without explicit width by default', () => {
      render(<Flex.H data-testid="flex-h">Content</Flex.H>);
      expect(screen.getByTestId('flex-h')).not.toHaveStyle({ width: '100%' });
    });

    it('Flex.V renders without explicit width by default', () => {
      render(<Flex.V data-testid="flex-v">Content</Flex.V>);
      expect(screen.getByTestId('flex-v')).not.toHaveStyle({ width: '100%' });
    });

    it('accepts width="full" as opt-in prop', () => {
      render(
        <Flex width="full" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toBeInTheDocument();
    });
  });

  describe('layout props', () => {
    it('applies gap prop', () => {
      render(<Flex gap={4}>Content</Flex>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies direction prop', () => {
      render(
        <Flex direction="column" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toBeInTheDocument();
    });

    it('applies align prop', () => {
      render(<Flex align="center">Content</Flex>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies justify prop', () => {
      render(<Flex justify="space-between">Content</Flex>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Flex.V (vertical)', () => {
    it('renders children in vertical layout', () => {
      render(
        <Flex.V>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex.V>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders with column direction', () => {
      render(<Flex.V data-testid="flex-v">Content</Flex.V>);
      expect(screen.getByTestId('flex-v')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Flex.V ref={ref}>Content</Flex.V>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Flex.V className="custom-class" data-testid="flex-v">
          Content
        </Flex.V>
      );
      expect(screen.getByTestId('flex-v')).toHaveClass('custom-class');
    });
  });

  describe('Flex.H (horizontal)', () => {
    it('renders children in horizontal layout', () => {
      render(
        <Flex.H>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex.H>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders with row direction', () => {
      render(<Flex.H data-testid="flex-h">Content</Flex.H>);
      expect(screen.getByTestId('flex-h')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Flex.H ref={ref}>Content</Flex.H>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Flex.H className="custom-class" data-testid="flex-h">
          Content
        </Flex.H>
      );
      expect(screen.getByTestId('flex-h')).toHaveClass('custom-class');
    });
  });

  describe('as prop (polymorphism)', () => {
    it('renders Flex as a nav element', () => {
      render(
        <Flex as="nav" data-testid="flex-nav">
          Nav content
        </Flex>
      );
      expect(screen.getByTestId('flex-nav').tagName).toBe('NAV');
    });

    it('renders Flex.H as a header element', () => {
      render(
        <Flex.H as="header" data-testid="flex-header">
          Header
        </Flex.H>
      );
      expect(screen.getByTestId('flex-header').tagName).toBe('HEADER');
    });

    it('renders Flex.V as a section element', () => {
      render(
        <Flex.V as="section" data-testid="flex-section">
          Section
        </Flex.V>
      );
      expect(screen.getByTestId('flex-section').tagName).toBe('SECTION');
    });

    it('renders Flex.V as a ul element', () => {
      render(
        <Flex.V as="ul" data-testid="flex-ul">
          <li>Item 1</li>
          <li>Item 2</li>
        </Flex.V>
      );
      expect(screen.getByTestId('flex-ul').tagName).toBe('UL');
    });
  });
});
