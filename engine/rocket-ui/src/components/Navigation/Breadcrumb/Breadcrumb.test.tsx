import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Breadcrumb } from './Breadcrumb';

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', current: true },
];

describe('<Breadcrumb />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Breadcrumb items={defaultItems} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders all items', () => {
      render(<Breadcrumb items={defaultItems} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
    });

    it('renders without items', () => {
      render(<Breadcrumb items={[]} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders single item', () => {
      render(<Breadcrumb items={[{ label: 'Home', current: true }]} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders with undefined items prop', () => {
      const { container } = render(
        <Breadcrumb items={undefined as unknown as Array<{ label: string }>} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders items without current property', () => {
      const itemsNoCurrent = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ];
      render(<Breadcrumb items={itemsNoCurrent} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      // Neither should have aria-current
      expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
      expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
    });
  });

  describe('links', () => {
    it('renders items with href as links', () => {
      render(<Breadcrumb items={defaultItems} />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders multiple links correctly', () => {
      render(<Breadcrumb items={defaultItems} />);
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');
    });

    it('renders item without href', () => {
      const items = [{ label: 'Home', href: '/' }, { label: 'Current Page' }];
      render(<Breadcrumb items={items} />);
      expect(screen.getByText('Current Page')).toBeInTheDocument();
    });
  });

  describe('current page', () => {
    it('marks current item with aria-current', () => {
      render(<Breadcrumb items={defaultItems} />);
      const currentLink = screen.getByText('Category').closest('a');
      expect(currentLink).toHaveAttribute('aria-current', 'page');
    });

    it('does not mark non-current items with aria-current', () => {
      render(<Breadcrumb items={defaultItems} />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).not.toHaveAttribute('aria-current');
    });
  });

  describe('separator', () => {
    it('renders default separator between items', () => {
      render(<Breadcrumb items={defaultItems} />);
      // Separators are rendered between items
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('renders custom separator', () => {
      render(<Breadcrumb items={defaultItems} separator=">" />);
      expect(screen.getAllByText('>').length).toBeGreaterThan(0);
    });

    it('renders custom separator element', () => {
      render(
        <Breadcrumb items={defaultItems} separator={<span data-testid="custom-sep">→</span>} />
      );
      expect(screen.getAllByTestId('custom-sep').length).toBeGreaterThan(0);
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders with size="%s"', (size) => {
      render(<Breadcrumb items={defaultItems} size={size} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Breadcrumb items={defaultItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has navigation role', () => {
      render(<Breadcrumb items={defaultItems} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('has list structure', () => {
      render(<Breadcrumb items={defaultItems} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders items as list items', () => {
      render(<Breadcrumb items={defaultItems} />);
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(3);
    });
  });

  describe('many items', () => {
    it('handles many breadcrumb items', () => {
      const manyItems = [
        { label: 'Home', href: '/' },
        { label: 'Level 1', href: '/1' },
        { label: 'Level 2', href: '/2' },
        { label: 'Level 3', href: '/3' },
        { label: 'Level 4', href: '/4' },
        { label: 'Current', current: true },
      ];
      render(<Breadcrumb items={manyItems} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLElement>();
      const items = [{ label: 'Home', href: '/' }];
      render(<Breadcrumb ref={ref} items={items} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      const items = [{ label: 'Home', href: '/' }];
      render(<Breadcrumb className="custom-class" data-testid="test" items={items} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
