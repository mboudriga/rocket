import { createRef } from 'react';
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuItalic,
  LuUnderline,
} from 'react-icons/lu';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Toolbar } from './Toolbar';

describe('<Toolbar />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
        </Toolbar>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with toggle group', async () => {
      const { container } = render(
        <Toolbar>
          <Toolbar.ToggleGroup type="single" defaultValue="left">
            <Toolbar.ToggleItem value="left" icon={<LuAlignLeft />} label="left" />
            <Toolbar.ToggleItem value="center" icon={<LuAlignCenter />} label="center" />
            <Toolbar.ToggleItem value="right" icon={<LuAlignRight />} label="right" />
          </Toolbar.ToggleGroup>
        </Toolbar>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders toolbar with button', () => {
      render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
        </Toolbar>
      );
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
    });

    it('renders multiple toolbar buttons', () => {
      render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
          <Toolbar.Button icon={<LuUnderline />} label="Underline" />
        </Toolbar>
      );
      expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Italic' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Underline' })).toBeInTheDocument();
    });

    it('renders separator between items', () => {
      render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Separator />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
        </Toolbar>
      );
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders vertical toolbar with correct orientation', () => {
      render(
        <Toolbar orientation="vertical">
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
        </Toolbar>
      );
      expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('button interaction', () => {
    it('calls onClick when button clicked', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" onClick={onClick} />
        </Toolbar>
      );

      await user.click(screen.getByRole('button', { name: 'Bold' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('verifies disabled button not activatable', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" onClick={onClick} disabled />
        </Toolbar>
      );

      await user.click(screen.getByRole('button', { name: 'Bold' }));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('navigates tools with ArrowLeft/ArrowRight', async () => {
      const { user } = render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
          <Toolbar.Button icon={<LuUnderline />} label="Underline" />
        </Toolbar>
      );

      const boldButton = screen.getByRole('button', { name: 'Bold' });
      boldButton.focus();

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('button', { name: 'Italic' })).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(boldButton).toHaveFocus();
    });

    it('navigates vertical toolbar with ArrowUp/ArrowDown', async () => {
      const { user } = render(
        <Toolbar orientation="vertical">
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
          <Toolbar.Button icon={<LuUnderline />} label="Underline" />
        </Toolbar>
      );

      const boldButton = screen.getByRole('button', { name: 'Bold' });
      boldButton.focus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('button', { name: 'Italic' })).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(boldButton).toHaveFocus();
    });

    it('navigates to first item with Home key', async () => {
      const { user } = render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
          <Toolbar.Button icon={<LuUnderline />} label="Underline" />
        </Toolbar>
      );

      const underlineButton = screen.getByRole('button', { name: 'Underline' });
      underlineButton.focus();

      await user.keyboard('{Home}');
      expect(screen.getByRole('button', { name: 'Bold' })).toHaveFocus();
    });

    it('navigates to last item with End key', async () => {
      const { user } = render(
        <Toolbar>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
          <Toolbar.Button icon={<LuUnderline />} label="Underline" />
        </Toolbar>
      );

      const boldButton = screen.getByRole('button', { name: 'Bold' });
      boldButton.focus();

      await user.keyboard('{End}');
      expect(screen.getByRole('button', { name: 'Underline' })).toHaveFocus();
    });

    it('wraps navigation when loop is enabled (default)', async () => {
      const { user } = render(
        <Toolbar loop={true}>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
        </Toolbar>
      );

      const italicButton = screen.getByRole('button', { name: 'Italic' });
      italicButton.focus();

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('button', { name: 'Bold' })).toHaveFocus();
    });

    it('stops at boundary when loop is disabled', async () => {
      const { user } = render(
        <Toolbar loop={false}>
          <Toolbar.Button icon={<LuBold />} label="Bold" />
          <Toolbar.Button icon={<LuItalic />} label="Italic" />
        </Toolbar>
      );

      const italicButton = screen.getByRole('button', { name: 'Italic' });
      italicButton.focus();

      await user.keyboard('{ArrowRight}');
      expect(italicButton).toHaveFocus();
    });
  });

  describe('toggle group', () => {
    it('renders toggle group structure', () => {
      render(
        <Toolbar>
          <Toolbar.ToggleGroup type="single">
            <Toolbar.ToggleItem value="left" icon={<LuAlignLeft />} label="left" />
            <Toolbar.ToggleItem value="center" icon={<LuAlignCenter />} label="center" />
          </Toolbar.ToggleGroup>
        </Toolbar>
      );
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });

    it('calls onValueChange with single value for type="single"', async () => {
      const onValueChange = vi.fn();
      const { user } = render(
        <Toolbar>
          <Toolbar.ToggleGroup type="single" onValueChange={onValueChange}>
            <Toolbar.ToggleItem value="left" icon={<LuAlignLeft />} label="left" />
            <Toolbar.ToggleItem value="center" icon={<LuAlignCenter />} label="center" />
          </Toolbar.ToggleGroup>
        </Toolbar>
      );

      await user.click(screen.getByRole('radio', { name: 'left' }));
      expect(onValueChange).toHaveBeenCalledWith('left');
    });

    it('calls onValueChange with array for type="multiple"', async () => {
      const onValueChange = vi.fn();
      const { user } = render(
        <Toolbar>
          <Toolbar.ToggleGroup type="multiple" onValueChange={onValueChange}>
            <Toolbar.ToggleItem value="bold" icon={<LuBold />} label="bold" />
            <Toolbar.ToggleItem value="italic" icon={<LuItalic />} label="italic" />
          </Toolbar.ToggleGroup>
        </Toolbar>
      );

      // Multiple mode uses buttons with aria-pressed
      await user.click(screen.getByRole('button', { name: 'bold' }));
      expect(onValueChange).toHaveBeenCalledWith(['bold']);
    });

    it('renders with array value prop', () => {
      render(
        <Toolbar>
          <Toolbar.ToggleGroup type="multiple" value={['bold', 'italic']}>
            <Toolbar.ToggleItem value="bold" icon={<LuBold />} label="bold" />
            <Toolbar.ToggleItem value="italic" icon={<LuItalic />} label="italic" />
          </Toolbar.ToggleGroup>
        </Toolbar>
      );
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });

    it('renders with array defaultValue', () => {
      render(
        <Toolbar>
          <Toolbar.ToggleGroup type="multiple" defaultValue={['bold']}>
            <Toolbar.ToggleItem value="bold" icon={<LuBold />} label="bold" />
            <Toolbar.ToggleItem value="italic" icon={<LuItalic />} label="italic" />
          </Toolbar.ToggleGroup>
        </Toolbar>
      );
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });
  });

  describe('toolbar link', () => {
    it('renders link with href', () => {
      render(
        <Toolbar>
          <Toolbar.Link href="/home" icon={<LuBold />} label="Home" />
        </Toolbar>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/home');
    });

    it('renders link with icon', () => {
      render(
        <Toolbar>
          <Toolbar.Link href="/test" icon={<LuBold data-testid="link-icon" />} label="Test" />
        </Toolbar>
      );
      expect(screen.getByTestId('link-icon')).toBeInTheDocument();
    });

    it('applies data-toolbar-item attribute', () => {
      render(
        <Toolbar>
          <Toolbar.Link href="/test" icon={<LuBold />} label="Test" />
        </Toolbar>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('data-toolbar-item');
    });

    it('inherits size from toolbar context', () => {
      render(
        <Toolbar size="lg">
          <Toolbar.Link href="/test" icon={<LuBold />} label="Test" />
        </Toolbar>
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Toolbar ref={ref}>
          <Toolbar.Button label="Button" />
        </Toolbar>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Toolbar className="custom-class" data-testid="test">
          <Toolbar.Button label="Button" />
        </Toolbar>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
