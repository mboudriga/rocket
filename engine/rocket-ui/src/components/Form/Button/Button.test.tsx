import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Button } from './Button';

describe('<Button />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  describe('click behavior', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      const { user } = render(<Button onClick={onClick}>Click</Button>);

      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <Button onClick={onClick} disabled>
          Click
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger onClick when loading', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <Button onClick={onClick} loading>
          Submit
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('keyboard activation', () => {
    it('activates with Enter key', async () => {
      const onClick = vi.fn();
      const { user } = render(<Button onClick={onClick}>Click</Button>);

      screen.getByRole('button').focus();
      await user.keyboard('{Enter}');

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates with Space key', async () => {
      const onClick = vi.fn();
      const { user } = render(<Button onClick={onClick}>Click</Button>);

      screen.getByRole('button').focus();
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders in loading state', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('data-loading');
    });

    it('renders with loading text', () => {
      render(
        <Button loading loadingText="Please wait...">
          Submit
        </Button>
      );
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });
  });

  describe('button types', () => {
    it('renders as submit button', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('renders as reset button', () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });

    it('renders as button type by default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <Button data-testid="custom-button" className="custom-class">
          Click me
        </Button>
      );
      expect(screen.getByTestId('custom-button')).toHaveClass('custom-class');
    });
  });
});
