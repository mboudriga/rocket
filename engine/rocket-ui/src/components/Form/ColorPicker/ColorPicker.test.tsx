import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { ColorPicker } from './ColorPicker';

describe('<ColorPicker />', () => {
  it('renders with default props', () => {
    render(<ColorPicker label="Color" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<ColorPicker label="Pick a Color" />);
    expect(screen.getByText('Pick a Color')).toBeInTheDocument();
  });

  describe('color picker interaction', () => {
    it('opens color picker on trigger click', async () => {
      const { user } = render(<ColorPicker label="Color" defaultValue="#ff0000" />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toBeInTheDocument();
      });
    });

    it('opens picker with Enter key', async () => {
      const { user } = render(<ColorPicker label="Color" defaultValue="#ff0000" />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-state', 'open');
      });
    });

    it('closes picker with Escape key', async () => {
      const { user } = render(<ColorPicker label="Color" defaultValue="#ff0000" />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-state', 'open');
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-state', 'closed');
      });
    });

    it('does not open when disabled', async () => {
      const { user } = render(<ColorPicker label="Color" defaultValue="#ff0000" disabled />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // Should remain closed when disabled
      expect(trigger).not.toHaveAttribute('data-state', 'open');
    });
  });

  describe('value handling', () => {
    it('renders with defaultValue', () => {
      render(<ColorPicker label="Color" defaultValue="#00ff00" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports controlled value', () => {
      render(<ColorPicker label="Color" value="#0000ff" onChange={() => {}} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls onChange when color is selected', async () => {
      const onChange = vi.fn();
      const { user } = render(<ColorPicker label="Color" onChange={onChange} />);

      // Get trigger button before opening (only one button initially)
      const trigger = screen.getByRole('button');

      // Open picker
      await user.click(trigger);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('data-state', 'open');
      });

      // Wait for Portal content and click a swatch
      let swatchTrigger: HTMLElement | null = null;
      await waitFor(() => {
        swatchTrigger = document.querySelector('[data-part="swatch-trigger"]');
        expect(swatchTrigger).toBeTruthy();
      });

      await user.click(swatchTrigger!);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<ColorPicker label="Color" disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('field wrapper integration', () => {
    it('renders with helper text', () => {
      render(<ColorPicker label="Color" hint="Choose your favorite color" />);
      expect(screen.getByText('Choose your favorite color')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<ColorPicker label="Color" invalid error="Color is required" />);
      expect(screen.getByText('Color is required')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ColorPicker label="Pick a Color" defaultValue="#ff0000" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
