import { createRef } from 'react';
import { LuCheck } from 'react-icons/lu';
import { axe, render, screen } from '../../../test/test-utils';

import { List } from './List';

describe('<List />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<List />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders children as list items', () => {
      render(
        <List>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </List>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders correct number of list items', () => {
      render(
        <List>
          <span>First</span>
          <span>Second</span>
        </List>
      );
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });
  });

  describe('icons', () => {
    it('renders with custom icon', () => {
      render(
        <List icon={<LuCheck data-testid="check-icon" />}>
          <span>Item with icon</span>
        </List>
      );
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });

    it('renders icon for each item', () => {
      render(
        <List icon={<LuCheck data-testid="check-icon" />}>
          <span>Item 1</span>
          <span>Item 2</span>
        </List>
      );
      const icons = screen.getAllByTestId('check-icon');
      expect(icons).toHaveLength(2);
    });
  });

  describe('icon color', () => {
    it('renders with custom icon color', () => {
      render(
        <List icon={<LuCheck data-testid="check-icon" />} iconColor="green.500">
          <span>Item</span>
        </List>
      );
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
  });

  describe('list types', () => {
    it('renders as unordered list by default', () => {
      render(
        <List>
          <span>Item</span>
        </List>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders empty list without children', () => {
      render(<List />);
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });

  describe('complex content', () => {
    it('renders items with complex content', () => {
      render(
        <List>
          <div>
            <strong>Bold text</strong>
            <span>with more text</span>
          </div>
        </List>
      );
      expect(screen.getByText('Bold text')).toBeInTheDocument();
      expect(screen.getByText('with more text')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <List>
          <span>Item 1</span>
          <span>Item 2</span>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLUListElement>();
      render(
        <List ref={ref}>
          <span>Item</span>
        </List>
      );
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <List className="custom-class" data-testid="test">
          <span>Item</span>
        </List>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
