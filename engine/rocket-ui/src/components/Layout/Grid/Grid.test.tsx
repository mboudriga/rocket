import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Grid } from './Grid';

describe('<Grid />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Grid>Grid Content</Grid>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Grid>Grid Content</Grid>);
      expect(screen.getByText('Grid Content')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Grid ref={ref}>Content</Grid>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Grid className="custom-class" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('custom-class');
    });
  });

  describe('columns', () => {
    it('renders with templateColumns', () => {
      render(
        <Grid templateColumns="repeat(3, 1fr)">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Grid>
      );
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders with columns prop', () => {
      render(<Grid columns={3}>Content</Grid>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('rows', () => {
    it('renders with templateRows', () => {
      render(<Grid templateRows="repeat(2, 1fr)">Content</Grid>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('gap', () => {
    it('renders with gap prop', () => {
      render(<Grid gap={4}>Content</Grid>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with columnGap and rowGap', () => {
      render(
        <Grid columnGap={4} rowGap={2}>
          Content
        </Grid>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('multiple items', () => {
    it('renders grid items', () => {
      render(
        <Grid templateColumns="repeat(2, 1fr)">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Grid>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
    });
  });

  describe('responsive columns', () => {
    it('applies responsive columns prop', () => {
      render(
        <Grid columns={{ base: 1, tablet: 2, desktop: 4 }}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Grid>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
    });

    it('applies responsive templateColumns', () => {
      render(
        <Grid
          templateColumns={{ base: '1fr', tablet: 'repeat(2, 1fr)', desktop: 'repeat(3, 1fr)' }}
        >
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </Grid>
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });
  });

  describe('minmax patterns', () => {
    it('renders with minmax in templateColumns', () => {
      render(<Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))">Content</Grid>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with minChildWidth', () => {
      render(
        <Grid minChildWidth="200px">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('spacing variants', () => {
    it('renders with gap prop', () => {
      render(<Grid gap={6}>Content</Grid>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with columnGap and rowGap', () => {
      render(
        <Grid columnGap={4} rowGap={8}>
          Content
        </Grid>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles empty grid', () => {
      render(<Grid data-testid="empty-grid" />);
      expect(screen.getByTestId('empty-grid')).toBeInTheDocument();
    });

    it('handles single child', () => {
      render(
        <Grid columns={3}>
          <div>Only One</div>
        </Grid>
      );
      expect(screen.getByText('Only One')).toBeInTheDocument();
    });
  });
});
