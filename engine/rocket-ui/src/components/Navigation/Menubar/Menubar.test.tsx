import { createRef } from 'react';
import { LuFile } from 'react-icons/lu';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Menubar } from './Menubar';

const defaultMenus = [
  {
    label: 'File',
    items: [
      { value: 'new', label: 'New' },
      { value: 'open', label: 'Open' },
      { value: 'save', label: 'Save' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { value: 'cut', label: 'Cut' },
      { value: 'copy', label: 'Copy' },
      { value: 'paste', label: 'Paste' },
    ],
  },
];

describe('<Menubar />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Menubar menus={defaultMenus} />);
      expect(screen.getByRole('menubar')).toBeInTheDocument();
    });

    it('renders all menu triggers', () => {
      render(<Menubar menus={defaultMenus} />);
      expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    });

    it('renders single menu', () => {
      const singleMenu = [
        {
          label: 'Options',
          items: [{ value: 'settings', label: 'Settings' }],
        },
      ];
      render(<Menubar menus={singleMenu} />);
      expect(screen.getByRole('menuitem', { name: 'Options' })).toBeInTheDocument();
    });

    it('renders multiple menus', () => {
      const multipleMenus = [
        { label: 'File', items: [{ value: 'new', label: 'New' }] },
        { label: 'Edit', items: [{ value: 'cut', label: 'Cut' }] },
        { label: 'View', items: [{ value: 'zoom', label: 'Zoom' }] },
        { label: 'Help', items: [{ value: 'about', label: 'About' }] },
      ];
      render(<Menubar menus={multipleMenus} />);
      expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'View' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Help' })).toBeInTheDocument();
    });
  });

  describe('menu open/close', () => {
    it('opens menu when trigger clicked', async () => {
      const { user } = render(<Menubar menus={defaultMenus} />);

      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });
    });

    it('shows all menu items when open', async () => {
      const { user } = render(<Menubar menus={defaultMenus} />);

      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Open' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Save' })).toBeInTheDocument();
      });
    });
  });

  describe('menu item interaction', () => {
    it('calls onClick when menu item clicked', async () => {
      const onClick = vi.fn();
      const menus = [
        {
          label: 'File',
          items: [{ value: 'new', label: 'New', onClick }],
        },
      ];
      const { user } = render(<Menubar menus={menus} />);

      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('menuitem', { name: 'New' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('closes menu after item click', async () => {
      const { user } = render(<Menubar menus={defaultMenus} />);

      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('menuitem', { name: 'New' }));
      await waitFor(() => {
        expect(screen.queryByRole('menuitem', { name: 'New' })).not.toBeInTheDocument();
      });
    });
  });

  describe('disabled items', () => {
    it('renders disabled menu items with aria-disabled', async () => {
      const menus = [
        {
          label: 'Edit',
          items: [
            { value: 'cut', label: 'Cut', disabled: true },
            { value: 'copy', label: 'Copy' },
          ],
        },
      ];
      const { user } = render(<Menubar menus={menus} />);

      await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
      await waitFor(() => {
        const cutItem = screen.getByRole('menuitem', { name: 'Cut' });
        expect(cutItem).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('icons', () => {
    it('renders menu items with icons', async () => {
      const menus = [
        {
          label: 'File',
          items: [{ value: 'new', label: 'New', icon: <LuFile data-testid="file-icon" /> }],
        },
      ];
      const { user } = render(<Menubar menus={menus} />);

      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByTestId('file-icon')).toBeInTheDocument();
      });
    });
  });

  describe('shortcuts', () => {
    it('renders menu items with keyboard shortcuts', async () => {
      const menus = [
        {
          label: 'Edit',
          items: [{ value: 'copy', label: 'Copy', shortcut: 'Ctrl+C' }],
        },
      ];
      const { user } = render(<Menubar menus={menus} />);

      await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
      await waitFor(() => {
        expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    // Note: We add role="menuitem" to trigger buttons to satisfy the ARIA menubar containment
    // requirement. This creates a semantic overlap (button + menuitem + aria-haspopup) but
    // resolves the axe violation while maintaining proper menu functionality.
    it('has no accessibility violations', async () => {
      const { container } = render(<Menubar menus={defaultMenus} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('hover navigation', () => {
    it('allows opening different menus', async () => {
      const { user } = render(<Menubar menus={defaultMenus} />);

      // Open File menu
      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });

      // Click Edit to switch menus
      await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
      });
    });

    it('closes menu when clicking away from different menu', async () => {
      const { user } = render(<Menubar menus={defaultMenus} />);

      // Open File menu
      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });

      // Switch to Edit menu - File should close
      await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
      await waitFor(() => {
        expect(screen.queryByRole('menuitem', { name: 'New' })).not.toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
      });
    });

    it('triggers mouse enter behavior when menu is already open', async () => {
      const { user } = render(<Menubar menus={defaultMenus} />);

      // Open File menu first
      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });

      // Hover over Edit menu - should switch menus
      await user.hover(screen.getByRole('menuitem', { name: 'Edit' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
      });
    });
  });

  describe('keyboard navigation', () => {
    it('menu triggers are focusable', () => {
      render(<Menubar menus={defaultMenus} />);

      const fileMenu = screen.getByRole('menuitem', { name: 'File' });
      const editMenu = screen.getByRole('menuitem', { name: 'Edit' });

      expect(fileMenu).not.toHaveAttribute('tabindex', '-1');
      expect(editMenu).not.toHaveAttribute('tabindex', '-1');
    });

    it('opens menu with ArrowDown', async () => {
      const { user } = render(<Menubar menus={defaultMenus} />);

      const fileMenu = screen.getByRole('menuitem', { name: 'File' });
      fileMenu.focus();
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });
    });

    it('selects item when clicked', async () => {
      const onClick = vi.fn();
      const menus = [
        {
          label: 'File',
          items: [{ value: 'new', label: 'New', onClick }],
        },
      ];
      const { user } = render(<Menubar menus={menus} />);

      await user.click(screen.getByRole('menuitem', { name: 'File' }));
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('menuitem', { name: 'New' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('menubar has proper role', () => {
      render(<Menubar menus={defaultMenus} />);

      expect(screen.getByRole('menubar')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Menubar ref={ref} menus={defaultMenus} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<Menubar className="custom-class" data-testid="test" menus={defaultMenus} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
