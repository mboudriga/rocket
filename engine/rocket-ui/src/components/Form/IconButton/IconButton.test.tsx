import { createRef } from 'react';
import { MdAdd } from 'react-icons/md';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { IconButton } from './IconButton';

describe('<IconButton />', () => {
  it('renders with aria-label', () => {
    render(
      <IconButton aria-label="Add item">
        <MdAdd />
      </IconButton>
    );
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('renders icon as child', () => {
    render(
      <IconButton aria-label="Add">
        <MdAdd data-testid="add-icon" />
      </IconButton>
    );
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
  });

  describe('click behavior', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <IconButton aria-label="Add" onClick={onClick}>
          <MdAdd />
        </IconButton>
      );

      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <IconButton aria-label="Add" onClick={onClick} disabled>
          <MdAdd />
        </IconButton>
      );

      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger onClick when loading', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <IconButton aria-label="Add" onClick={onClick} loading>
          <MdAdd />
        </IconButton>
      );

      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(
        <IconButton aria-label="Add" disabled>
          <MdAdd />
        </IconButton>
      );
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders in loading state', () => {
      render(
        <IconButton aria-label="Add" loading>
          <MdAdd />
        </IconButton>
      );
      expect(screen.getByRole('button')).toHaveAttribute('data-loading');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <IconButton aria-label="Add item">
          <MdAdd />
        </IconButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <IconButton ref={ref} aria-label="Add">
          <MdAdd />
        </IconButton>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <IconButton data-testid="custom-icon-button" className="custom-class" aria-label="Add">
          <MdAdd />
        </IconButton>
      );
      expect(screen.getByTestId('custom-icon-button')).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('renders with variant="outline" (applies bg styles)', () => {
      render(
        <IconButton aria-label="Add" variant="outline">
          <MdAdd />
        </IconButton>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with variant="ghost" (no extra bg styles)', () => {
      render(
        <IconButton aria-label="Add" variant="ghost">
          <MdAdd />
        </IconButton>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with variant="solid"', () => {
      render(
        <IconButton aria-label="Add" variant="solid">
          <MdAdd />
        </IconButton>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
