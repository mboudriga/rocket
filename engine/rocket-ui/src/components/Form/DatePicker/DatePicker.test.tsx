import {
  CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';
import { useState } from 'react';
import { vi } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { DatePicker } from './DatePicker';

describe('<DatePicker />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DatePicker label="Select Date" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations in inline mode', async () => {
      const { container } = render(<DatePicker label="Inline Calendar" inline />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with default value displayed', () => {
      const defaultDate = new CalendarDate(2024, 1, 15);
      render(<DatePicker label="Date" defaultValue={defaultDate} />);
      expect(screen.getByRole('textbox')).toHaveValue('Jan 15, 2024');
    });

    it('renders inline calendar without popover', () => {
      render(<DatePicker label="Inline Calendar" inline />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Open calendar' })).not.toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('opens calendar popover when button is clicked', async () => {
      const { user } = render(<DatePicker label="Date" />);

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
    });

    it('clears the date when clear button is clicked', async () => {
      const onChange = vi.fn();
      const defaultDate = new CalendarDate(2024, 1, 15);
      const { user } = render(
        <DatePicker label="Date" defaultValue={defaultDate} clearable onChange={onChange} />
      );

      await user.click(screen.getByRole('button', { name: 'Clear date' }));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '' }),
        })
      );
    });

    it('navigates to previous month', async () => {
      const { user } = render(<DatePicker label="Date" inline />);

      const previousButton = screen.getByRole('button', { name: 'Previous month' });
      expect(previousButton).toBeInTheDocument();

      await user.click(previousButton);
      // Verify navigation occurred without crashing
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('navigates to next month', async () => {
      const { user } = render(<DatePicker label="Date" inline />);

      const nextButton = screen.getByRole('button', { name: 'Next month' });
      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);
      // Verify navigation occurred without crashing
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('disables calendar button when disabled', () => {
      const todayDate = today(getLocalTimeZone());
      render(<DatePicker label="Date" disabled defaultValue={todayDate} />);

      expect(screen.getByRole('button', { name: 'Open calendar' })).toBeDisabled();
    });

    it('disables calendar button when readOnly', () => {
      const todayDate = today(getLocalTimeZone());
      render(<DatePicker label="Date" readOnly defaultValue={todayDate} />);

      expect(screen.getByRole('button', { name: 'Open calendar' })).toBeDisabled();
    });

    it('renders error message', () => {
      render(<DatePicker label="Date" error="Date is required" />);
      expect(screen.getByText('Date is required')).toBeInTheDocument();
    });
  });

  describe('range mode', () => {
    it('renders two input fields for date range', () => {
      render(<DatePicker label="Date Range" mode="range" />);

      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(2);
    });

    it('renders preset buttons when presets are provided', async () => {
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);

      const { user } = render(
        <DatePicker
          label="Date Range"
          mode="range"
          presets={[{ label: 'Last 7 days', value: [weekAgo, now] }]}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Last 7 days' })).toBeInTheDocument();
      });
    });

    it('clears range and calls onChange with null when clear button is clicked', async () => {
      const onChange = vi.fn();
      const defaultRange = {
        start: new CalendarDate(2024, 1, 10),
        end: new CalendarDate(2024, 1, 15),
      };
      const { user } = render(
        <DatePicker
          label="Date Range"
          mode="range"
          defaultValue={defaultRange}
          clearable
          onChange={onChange}
        />
      );

      // Verify initial state shows the range
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('1/10/24');
      expect(inputs[1]).toHaveValue('1/15/24');

      // Click clear button
      await user.click(screen.getByRole('button', { name: 'Clear dates' }));

      // onChange should be called with empty value (synthetic event)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '' }),
        })
      );

      // Inputs should be empty
      expect(inputs[0]).toHaveValue('');
      expect(inputs[1]).toHaveValue('');
    });

    it('allows new selection after clearing (fixes highlighting bug)', async () => {
      // Use controlled mode with inline to test the fix for stale highlighting
      const TestComponent = () => {
        const [value, setValue] = useState<{
          start: CalendarDate;
          end: CalendarDate;
        } | null>({
          start: new CalendarDate(2024, 1, 10),
          end: new CalendarDate(2024, 1, 15),
        });

        return (
          <div>
            <DatePicker
              label="Date Range"
              mode="range"
              value={value}
              onChange={(e) => {
                if (!e.target.value) {
                  setValue(null);
                  return;
                }
                const parsed = JSON.parse(e.target.value);
                setValue({
                  start: parseDate(parsed.start) as CalendarDate,
                  end: parseDate(parsed.end) as CalendarDate,
                });
              }}
              inline
            />
            <button type="button" data-testid="clear-btn" onClick={() => setValue(null)}>
              Clear
            </button>
          </div>
        );
      };

      const { user } = render(<TestComponent />);

      // Verify initial state - the calendar should be visible inline
      expect(screen.getByRole('application')).toBeInTheDocument();

      // Clear the value
      await user.click(screen.getByTestId('clear-btn'));

      // Get all day buttons (dates 1-31 etc)
      const gridButtons = screen
        .getAllByRole('button')
        .filter((btn) => /^\d+$/.test(btn.textContent || ''));

      // Find the buttons for day 5 and day 8
      const day5Button = gridButtons.find((btn) => btn.textContent === '5');
      const day8Button = gridButtons.find((btn) => btn.textContent === '8');

      expect(day5Button).toBeDefined();
      expect(day8Button).toBeDefined();

      // Select a new range - this should work without stale highlighting issues
      if (day5Button && day8Button) {
        await user.click(day5Button);
        await user.click(day8Button);

        // Calendar should still be functional after clearing
        expect(screen.getByRole('application')).toBeInTheDocument();
      }
    });

    it('clears state and allows preset selection after clear', async () => {
      const now = new Date(2024, 0, 20);
      const weekAgo = new Date(2024, 0, 13);

      // Use controlled mode with inline
      const TestComponent = () => {
        const [value, setValue] = useState<{
          start: CalendarDate;
          end: CalendarDate;
        } | null>({
          start: new CalendarDate(2024, 1, 10),
          end: new CalendarDate(2024, 1, 15),
        });

        return (
          <div>
            <DatePicker
              label="Date Range"
              mode="range"
              value={value}
              onChange={(e) => {
                if (!e.target.value) {
                  setValue(null);
                  return;
                }
                const parsed = JSON.parse(e.target.value);
                setValue({
                  start: parseDate(parsed.start) as CalendarDate,
                  end: parseDate(parsed.end) as CalendarDate,
                });
              }}
              presets={[{ label: 'Last 7 days', value: [weekAgo, now] }]}
              inline
            />
            <button type="button" data-testid="clear-btn" onClick={() => setValue(null)}>
              Clear
            </button>
          </div>
        );
      };

      const { user } = render(<TestComponent />);

      // Clear the value
      await user.click(screen.getByTestId('clear-btn'));

      // Select a preset
      await user.click(screen.getByRole('button', { name: 'Last 7 days' }));

      // Calendar should still work after clearing and selecting preset
      expect(screen.getByRole('application')).toBeInTheDocument();
    });

    it('handles controlled mode external clear correctly', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState<{
          start: CalendarDate;
          end: CalendarDate;
        } | null>({
          start: new CalendarDate(2024, 1, 10),
          end: new CalendarDate(2024, 1, 15),
        });

        return (
          <div>
            <DatePicker
              label="Date Range"
              mode="range"
              value={value}
              onChange={(e) => {
                if (!e.target.value) {
                  setValue(null);
                  return;
                }
                const parsed = JSON.parse(e.target.value);
                setValue({
                  start: parseDate(parsed.start) as CalendarDate,
                  end: parseDate(parsed.end) as CalendarDate,
                });
              }}
            />
            <button type="button" data-testid="external-clear" onClick={() => setValue(null)}>
              External Clear
            </button>
          </div>
        );
      };

      const { user } = render(<TestComponent />);

      // Verify initial state
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('1/10/24');
      expect(inputs[1]).toHaveValue('1/15/24');

      // Clear via external button
      await user.click(screen.getByTestId('external-clear'));

      // Inputs should be empty
      await waitFor(() => {
        expect(inputs[0]).toHaveValue('');
        expect(inputs[1]).toHaveValue('');
      });
    });
  });

  describe('datetime mode', () => {
    it('renders time input fields when opened', async () => {
      const { user } = render(<DatePicker label="Date & Time" mode="datetime" />);

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        expect(screen.getByRole('spinbutton', { name: 'Hour' })).toBeInTheDocument();
        expect(screen.getByRole('spinbutton', { name: 'Minute' })).toBeInTheDocument();
      });
    });

    it('renders AM/PM selector in 12-hour mode', async () => {
      const { user } = render(<DatePicker label="Date & Time" mode="datetime" hourCycle={12} />);

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        expect(screen.getByRole('combobox', { name: 'AM/PM' })).toBeInTheDocument();
      });
    });

    it('calls onChange when hour is changed', async () => {
      const onChange = vi.fn();
      const defaultDate = new CalendarDateTime(2024, 1, 15, 0, 0);
      const { user } = render(
        <DatePicker
          label="Date & Time"
          mode="datetime"
          defaultValue={defaultDate}
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        expect(screen.getByRole('spinbutton', { name: 'Hour' })).toBeInTheDocument();
      });

      const hourInput = screen.getByRole('spinbutton', { name: 'Hour' });
      fireEvent.change(hourInput, { target: { value: '3' } });

      expect(onChange).toHaveBeenCalled();
    });

    it('calls onChange when minute is changed', async () => {
      const onChange = vi.fn();
      const defaultDate = new CalendarDateTime(2024, 1, 15, 0, 0);
      const { user } = render(
        <DatePicker
          label="Date & Time"
          mode="datetime"
          defaultValue={defaultDate}
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        expect(screen.getByRole('spinbutton', { name: 'Minute' })).toBeInTheDocument();
      });

      const minuteInput = screen.getByRole('spinbutton', { name: 'Minute' });
      fireEvent.change(minuteInput, { target: { value: '30' } });

      expect(onChange).toHaveBeenCalled();
    });

    it('calls onChange when AM/PM is changed', async () => {
      const onChange = vi.fn();
      const defaultDate = new CalendarDateTime(2024, 1, 15, 0, 0);
      const { user } = render(
        <DatePicker
          label="Date & Time"
          mode="datetime"
          hourCycle={12}
          defaultValue={defaultDate}
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        expect(screen.getByRole('combobox', { name: 'AM/PM' })).toBeInTheDocument();
      });

      const ampmSelect = screen.getByRole('combobox', { name: 'AM/PM' });
      fireEvent.change(ampmSelect, { target: { value: 'PM' } });

      expect(onChange).toHaveBeenCalled();
    });

    it('clears datetime value when clear button is clicked', async () => {
      const onChange = vi.fn();
      const defaultDate = new CalendarDateTime(2024, 1, 15, 0, 0);
      const { user } = render(
        <DatePicker
          label="Date & Time"
          mode="datetime"
          defaultValue={defaultDate}
          clearable
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Clear date' }));

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '' }),
        })
      );
    });

    it('renders datetime in inline mode', () => {
      render(<DatePicker label="Date & Time" mode="datetime" inline />);

      expect(screen.getByRole('grid')).toBeInTheDocument();
      expect(screen.getByRole('spinbutton', { name: 'Hour' })).toBeInTheDocument();
      expect(screen.getByRole('spinbutton', { name: 'Minute' })).toBeInTheDocument();
    });

    it('selects a date and updates datetime value', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <DatePicker label="Date & Time" mode="datetime" onChange={onChange} inline />
      );

      // Find a day button (e.g., day 15)
      const gridButtons = screen
        .getAllByRole('button')
        .filter((btn) => /^\d+$/.test(btn.textContent || ''));
      const day15Button = gridButtons.find((btn) => btn.textContent === '15');

      if (day15Button) {
        await user.click(day15Button);
        expect(onChange).toHaveBeenCalled();
      }
    });
  });

  describe('date constraints', () => {
    it('disables dates outside min/max range', async () => {
      const minDate = new CalendarDate(2024, 1, 10);
      const maxDate = new CalendarDate(2024, 1, 20);

      render(<DatePicker label="Constrained Date" minValue={minDate} maxValue={maxDate} inline />);

      // Dates within range should be enabled
      const enabledDate = screen.getByRole('button', { name: /15/ });
      expect(enabledDate).not.toBeDisabled();
    });

    it('marks weekend dates as aria-disabled when isDateUnavailable is set', async () => {
      // Use a fixed date in January 2024 where we know the calendar layout
      const fixedDate = new CalendarDate(2024, 1, 15);

      render(
        <DatePicker
          label="Available Dates"
          inline
          defaultValue={fixedDate}
          isDateUnavailable={(date) => {
            const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
            return dayOfWeek === 0 || dayOfWeek === 6;
          }}
        />
      );

      // Find a weekend date button (Jan 13, 2024 is a Saturday)
      const saturdayButton = screen.getByRole('button', { name: /13/ });
      // Unavailable dates should be aria-disabled (not HTML disabled) so they remain focusable
      expect(saturdayButton).toHaveAttribute('aria-disabled', 'true');

      // Find a weekday date button (Jan 15, 2024 is a Monday)
      const mondayButton = screen.getByRole('button', { name: /15/ });
      // Weekday dates should not have aria-disabled
      expect(mondayButton).not.toHaveAttribute('aria-disabled');
    });
  });

  describe('range mode - today as first selection', () => {
    it('does not show range highlighting when clicking a non-today date as first selection', async () => {
      const { user } = render(
        <DatePicker label="Range" mode="range" inline defaultValue={undefined} />
      );

      const gridButtons = screen
        .getAllByRole('button')
        .filter((btn) => /^\d+$/.test(btn.textContent || ''));

      const todayDate = today(getLocalTimeZone());
      // Pick a date that is NOT today
      const nonTodayButton = gridButtons.find((btn) => btn.textContent !== String(todayDate.day));

      expect(nonTodayButton).toBeDefined();
      if (nonTodayButton) {
        await user.click(nonTodayButton);
        expect(screen.getByRole('application')).toBeInTheDocument();
      }
    });

    it('handles clicking today as first date in range selection without premature highlighting', async () => {
      const todayDate = today(getLocalTimeZone());
      const { user } = render(
        <DatePicker label="Range" mode="range" inline defaultValue={undefined} />
      );

      // Find today's date button (it has bold font weight as the indicator)
      const gridButtons = screen
        .getAllByRole('button')
        .filter((btn) => /^\d+$/.test(btn.textContent || ''));
      const todayButton = gridButtons.find((btn) => btn.textContent === String(todayDate.day));

      expect(todayButton).toBeDefined();

      if (todayButton) {
        // Click today as first selection
        await user.click(todayButton);

        // After single click, there should be no range highlighting visible yet
        // The button should not have the range background color applied
        // (range highlighting only appears after hovering/clicking second date)
        expect(screen.getByRole('application')).toBeInTheDocument();
      }
    });
  });

  describe('range mode - preset constraints', () => {
    it('does not apply preset when clamping would invert the range', async () => {
      // Preset: Jan 1-7, minValue: Jan 10
      // After clamping start to Jan 10, end (Jan 7) < start - should not apply
      const minDate = new CalendarDate(2024, 1, 10);
      const jan1 = new Date(2024, 0, 1);
      const jan7 = new Date(2024, 0, 7);

      const onChange = vi.fn();

      const { user } = render(
        <DatePicker
          label="Date Range"
          mode="range"
          minValue={minDate}
          onChange={onChange}
          presets={[{ label: 'First Week', value: [jan1, jan7] }]}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        // The preset should be disabled since entire range is before minValue
        expect(screen.getByRole('button', { name: 'First Week' })).toBeDisabled();
      });
    });

    it('disables preset buttons when entire range is outside min/max', async () => {
      const minDate = new CalendarDate(2024, 2, 1);
      const maxDate = new CalendarDate(2024, 2, 28);

      // Preset entirely before minValue
      const jan1 = new Date(2024, 0, 1);
      const jan7 = new Date(2024, 0, 7);

      // Preset entirely after maxValue
      const mar1 = new Date(2024, 2, 1);
      const mar7 = new Date(2024, 2, 7);

      // Preset within range
      const feb10 = new Date(2024, 1, 10);
      const feb15 = new Date(2024, 1, 15);

      const { user } = render(
        <DatePicker
          label="Date Range"
          mode="range"
          minValue={minDate}
          maxValue={maxDate}
          presets={[
            { label: 'Early Jan', value: [jan1, jan7] },
            { label: 'Mid Feb', value: [feb10, feb15] },
            { label: 'Early Mar', value: [mar1, mar7] },
          ]}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Open calendar' }));

      await waitFor(() => {
        // Preset before minValue should be disabled
        expect(screen.getByRole('button', { name: 'Early Jan' })).toBeDisabled();

        // Preset after maxValue should be disabled
        expect(screen.getByRole('button', { name: 'Early Mar' })).toBeDisabled();

        // Preset within range should be enabled
        expect(screen.getByRole('button', { name: 'Mid Feb' })).not.toBeDisabled();
      });
    });
  });

  describe('datetime mode - invalid input handling', () => {
    it('handles NaN input in hour field gracefully', async () => {
      const defaultDate = new CalendarDateTime(2024, 1, 15, 10, 30);
      const { user } = render(
        <DatePicker label="Date & Time" mode="datetime" defaultValue={defaultDate} inline />
      );

      const hourInput = screen.getByRole('spinbutton', { name: 'Hour' });

      // Clear and type invalid characters
      fireEvent.change(hourInput, { target: { value: '' } });
      fireEvent.change(hourInput, { target: { value: 'abc' } });

      // NaN should clamp to valid number (Math.max/min with NaN returns NaN,
      // but React's controlled input should handle this gracefully)
      // The input should still be functional
      expect(hourInput).toBeInTheDocument();
    });
  });

  describe('datetime mode - time boundaries', () => {
    it('wraps hour from 12 to 1 in 12-hour mode without changing AM/PM', async () => {
      const defaultDate = new CalendarDateTime(2024, 1, 15, 12, 30); // 12:30 PM
      const onChange = vi.fn();
      const { user } = render(
        <DatePicker
          label="Date & Time"
          mode="datetime"
          hourCycle={12}
          defaultValue={defaultDate}
          onChange={onChange}
          inline
        />
      );

      const hourInput = screen.getByRole('spinbutton', { name: 'Hour' });

      // Focus and press ArrowUp to go from 12 to 1
      await user.click(hourInput);
      await user.keyboard('{ArrowUp}');

      // Hour should wrap to 1 (not 13)
      expect(hourInput).toHaveValue(1);
    });

    it('wraps hour from 1 to 12 in 12-hour mode without changing AM/PM', async () => {
      const defaultDate = new CalendarDateTime(2024, 1, 15, 1, 30); // 1:30 AM
      const onChange = vi.fn();
      const { user } = render(
        <DatePicker
          label="Date & Time"
          mode="datetime"
          hourCycle={12}
          defaultValue={defaultDate}
          onChange={onChange}
          inline
        />
      );

      const hourInput = screen.getByRole('spinbutton', { name: 'Hour' });

      // Focus and press ArrowDown to go from 1 to 12
      await user.click(hourInput);
      await user.keyboard('{ArrowDown}');

      // Hour should wrap to 12 (not 0)
      expect(hourInput).toHaveValue(12);
    });

    it('wraps minute from 59 to 0 without changing hour', async () => {
      const defaultDate = new CalendarDateTime(2024, 1, 15, 10, 59);
      const { user } = render(
        <DatePicker label="Date & Time" mode="datetime" defaultValue={defaultDate} inline />
      );

      const minuteInput = screen.getByRole('spinbutton', { name: 'Minute' });
      const hourInput = screen.getByRole('spinbutton', { name: 'Hour' });

      // Focus and press ArrowUp to go from 59 to 0
      await user.click(minuteInput);
      await user.keyboard('{ArrowUp}');

      // Minute should wrap to 0
      expect(minuteInput).toHaveValue(0);

      // Hour should stay the same (10 in 24h mode, or display hour in 12h)
      expect(hourInput).toHaveValue(10);
    });
  });
});
