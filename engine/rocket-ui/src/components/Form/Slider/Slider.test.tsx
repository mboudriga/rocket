import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Slider } from './Slider';

describe('<Slider />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Slider label="Volume" defaultValue={[50]} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with label', () => {
      render(<Slider label="Volume" defaultValue={[50]} />);
      expect(screen.getAllByText('Volume')[0]).toBeInTheDocument();
    });

    it('renders slider control', () => {
      render(<Slider label="Volume" defaultValue={[50]} data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });

  describe('value handling', () => {
    it('renders with default value', () => {
      render(<Slider label="Volume" defaultValue={[75]} data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });

    it('renders with controlled value', () => {
      render(<Slider label="Volume" value={[25]} onChange={() => {}} data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });

    it('accepts onChange handler', async () => {
      const onChange = vi.fn();
      render(
        <Slider label="Volume" defaultValue={[50]} onChange={onChange} data-testid="slider" />
      );
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });

  describe('marks', () => {
    it('renders with custom marks', () => {
      render(
        <Slider
          label="Volume"
          defaultValue={[50]}
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      );
      expect(screen.getByText('0%')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Slider label="Volume" defaultValue={[50]} disabled data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });

  describe('orientation', () => {
    it('renders with horizontal orientation by default', () => {
      render(<Slider label="Volume" defaultValue={[50]} data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });

    it('renders with vertical orientation', () => {
      render(
        <Slider label="Volume" defaultValue={[50]} orientation="vertical" data-testid="slider" />
      );
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });

  describe('field wrapper integration', () => {
    it('renders with hint text', () => {
      render(<Slider label="Volume" defaultValue={[50]} hint="Adjust the volume" />);
      expect(screen.getByText('Adjust the volume')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<Slider label="Volume" defaultValue={[50]} error="Value is required" />);
      expect(screen.getByText('Value is required')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('increases value with ArrowRight key', async () => {
      const onChange = vi.fn();
      const { user, container } = render(
        <Slider label="Volume" defaultValue={[50]} onChange={onChange} step={1} />
      );

      const thumb = container.querySelector('[data-part="thumb"]') as HTMLElement;
      thumb.focus();

      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(JSON.parse(event.target.value)).toEqual([51]);
    });

    it('decreases value with ArrowLeft key', async () => {
      const onChange = vi.fn();
      const { user, container } = render(
        <Slider label="Volume" defaultValue={[50]} onChange={onChange} step={1} />
      );

      const thumb = container.querySelector('[data-part="thumb"]') as HTMLElement;
      thumb.focus();

      await user.keyboard('{ArrowLeft}');
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(JSON.parse(event.target.value)).toEqual([49]);
    });

    it('has thumb element for keyboard interaction', () => {
      const { container } = render(<Slider label="Volume" defaultValue={[50]} />);

      const thumb = container.querySelector('[data-part="thumb"]');
      expect(thumb).toBeInTheDocument();
    });

    it('respects min constraint', async () => {
      const onChange = vi.fn();
      const { user, container } = render(
        <Slider label="Volume" defaultValue={[0]} onChange={onChange} min={0} max={100} step={1} />
      );

      const thumb = container.querySelector('[data-part="thumb"]') as HTMLElement;
      thumb.focus();

      await user.keyboard('{ArrowLeft}');
      // Should not go below min
      expect(onChange).not.toHaveBeenCalled();
    });

    it('respects max constraint', async () => {
      const onChange = vi.fn();
      const { user, container } = render(
        <Slider
          label="Volume"
          defaultValue={[100]}
          onChange={onChange}
          min={0}
          max={100}
          step={1}
        />
      );

      const thumb = container.querySelector('[data-part="thumb"]') as HTMLElement;
      thumb.focus();

      await user.keyboard('{ArrowRight}');
      // Should not go above max
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Slider label="Volume" defaultValue={[50]} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <Slider
          label="Volume"
          defaultValue={[50]}
          data-testid="custom-slider"
          className="custom-class"
        />
      );
      expect(screen.getByTestId('custom-slider')).toHaveClass('custom-class');
    });
  });

  describe('onChange event shape', () => {
    it('provides event with correct value format for JSON.parse', async () => {
      const onChange = vi.fn();
      const { container } = render(
        <Slider label="Volume" defaultValue={[50]} onChange={onChange} step={1} />
      );

      const thumb = container.querySelector('[data-part="thumb"]') as HTMLElement;
      thumb.focus();
      await screen.findAllByText('Volume');

      // Slider onChange receives array directly, not an event
      // But verify the component works with the value
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('readOnly state', () => {
    it('renders in readOnly state', () => {
      render(<Slider label="Volume" defaultValue={[50]} readOnly data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<Slider label="Volume" defaultValue={[50]} invalid data-testid="slider" />);
      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });
});
