import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Wrap } from './Wrap';

describe('<Wrap />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Wrap>Wrap Content</Wrap>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Wrap>Wrap Content</Wrap>);
      expect(screen.getByText('Wrap Content')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Wrap ref={ref}>Content</Wrap>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Wrap className="custom-class" data-testid="wrap">
          Content
        </Wrap>
      );
      expect(screen.getByTestId('wrap')).toHaveClass('custom-class');
    });
  });

  describe('spacing', () => {
    it('renders with gap prop', () => {
      render(<Wrap gap={4}>Content</Wrap>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with responsive gap', () => {
      render(<Wrap gap={{ base: 2, tablet: 4, desktop: 6 }}>Content</Wrap>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('alignment', () => {
    it('renders with align prop', () => {
      render(<Wrap align="center">Content</Wrap>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with justify prop', () => {
      render(<Wrap justify="center">Content</Wrap>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('multiple items', () => {
    it('renders wrapped items', () => {
      render(
        <Wrap>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </Wrap>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });
});
