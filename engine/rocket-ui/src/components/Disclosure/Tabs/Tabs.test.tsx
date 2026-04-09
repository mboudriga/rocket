import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Tabs } from './Tabs';
import type { TabItemProps } from './Tabs.types';

const defaultTabs: Array<TabItemProps> = [
  { value: 'tab-1', title: 'First Tab' },
  { value: 'tab-2', title: 'Second Tab' },
  { value: 'tab-3', title: 'Third Tab' },
];

describe('<Tabs />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Tabs tabs={defaultTabs} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('renders with default props', () => {
    render(<Tabs tabs={defaultTabs} />);
    expect(screen.getByText('First Tab')).toBeInTheDocument();
    expect(screen.getByText('Second Tab')).toBeInTheDocument();
    expect(screen.getByText('Third Tab')).toBeInTheDocument();
  });

  it('renders with undefined tabs prop', () => {
    const { container } = render(<Tabs tabs={undefined as unknown as Array<TabItemProps>} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with more children than tabs', () => {
    const twoTabs: Array<TabItemProps> = [
      { value: 'tab-1', title: 'First Tab' },
      { value: 'tab-2', title: 'Second Tab' },
    ];
    render(
      <Tabs tabs={twoTabs} defaultValue="tab-1">
        <div>First Content</div>
        <div>Second Content</div>
        <div>Third Content (extra)</div>
      </Tabs>
    );
    expect(screen.getByText('First Tab')).toBeInTheDocument();
    expect(screen.getByText('Second Tab')).toBeInTheDocument();
  });

  it('renders tabs without icons explicitly', () => {
    const tabsNoIcons: Array<TabItemProps> = [{ value: 'tab-1', title: 'Tab Without Icon' }];
    render(<Tabs tabs={tabsNoIcons} />);
    expect(screen.getByText('Tab Without Icon')).toBeInTheDocument();
  });

  it('renders tab content', () => {
    render(
      <Tabs tabs={defaultTabs} defaultValue="tab-1">
        <div>First Content</div>
        <div>Second Content</div>
        <div>Third Content</div>
      </Tabs>
    );
    expect(screen.getByText('First Content')).toBeInTheDocument();
  });

  describe('tab switching', () => {
    it('switches content when tab is clicked', async () => {
      const { user } = render(
        <Tabs tabs={defaultTabs} defaultValue="tab-1">
          <div>First Content</div>
          <div>Second Content</div>
          <div>Third Content</div>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Second Tab' }));
      await waitFor(() => {
        expect(screen.getByText('Second Content')).toBeInTheDocument();
      });
    });

    it('calls onChange when tab is switched', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Tabs tabs={defaultTabs} onChange={onChange} defaultValue="tab-1">
          <div>Content</div>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Second Tab' }));
      expect(onChange).toHaveBeenCalledWith('tab-2');
    });
  });

  describe('defaultValue', () => {
    it('renders with specified default tab selected', () => {
      render(
        <Tabs tabs={defaultTabs} defaultValue="tab-2">
          <div>First Content</div>
          <div>Second Content</div>
          <div>Third Content</div>
        </Tabs>
      );
      expect(screen.getByText('Second Content')).toBeInTheDocument();
    });
  });

  describe('with icons', () => {
    it('renders tabs with icons', () => {
      const tabsWithIcons: Array<TabItemProps> = [
        { value: 'tab-1', title: 'Tab 1', icon: <span data-testid="icon-1">icon</span> },
        { value: 'tab-2', title: 'Tab 2' },
      ];
      render(<Tabs tabs={tabsWithIcons} />);
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('tabs have proper ARIA tablist role', () => {
      render(
        <Tabs tabs={defaultTabs} defaultValue="tab-1">
          <div>First Content</div>
          <div>Second Content</div>
          <div>Third Content</div>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders all tabs with proper role', () => {
      render(
        <Tabs tabs={defaultTabs} defaultValue="tab-1">
          <div>First Content</div>
          <div>Second Content</div>
          <div>Third Content</div>
        </Tabs>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      // Each tab should have proper role attribute
      tabs.forEach((tab) => {
        expect(tab).toHaveAttribute('role', 'tab');
      });
    });

    it('has aria-selected on active tab', () => {
      render(
        <Tabs tabs={defaultTabs} defaultValue="tab-2">
          <div>First Content</div>
          <div>Second Content</div>
          <div>Third Content</div>
        </Tabs>
      );

      const selectedTab = screen.getByRole('tab', { name: 'Second Tab' });
      expect(selectedTab).toHaveAttribute('aria-selected', 'true');

      const unselectedTab = screen.getByRole('tab', { name: 'First Tab' });
      expect(unselectedTab).toHaveAttribute('aria-selected', 'false');
    });

    it('activates tab panel when clicked', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Tabs tabs={defaultTabs} defaultValue="tab-1" onChange={onChange}>
          <div>First Content</div>
          <div>Second Content</div>
          <div>Third Content</div>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Second Tab' }));
      expect(onChange).toHaveBeenCalledWith('tab-2');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Tabs ref={ref} tabs={defaultTabs}>
          <div>Content</div>
        </Tabs>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Tabs className="custom-class" data-testid="test" tabs={defaultTabs}>
          <div>Content</div>
        </Tabs>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
