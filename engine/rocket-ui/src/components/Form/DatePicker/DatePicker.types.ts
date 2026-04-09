import type { CalendarDate, CalendarDateTime, DateValue } from '@internationalized/date';

export type DatePickerMode = 'single' | 'range' | 'datetime';

export interface DatePickerPreset {
  label: string;
  value: [Date, Date];
}

// Base props shared across all modes
interface DatePickerBaseProps {
  // FieldWrapper integration
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  /** A sub label that appears below the component */
  hint?: string;
  /** If present, it will replace the hint and apply invalid styles */
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;

  // Display
  /** Placeholder text for the input */
  placeholder?: string;
  /** Render calendar without popup */
  inline?: boolean;

  // Behavior
  /** Show clear button */
  clearable?: boolean;
  /** Close popup after selection (single mode only) */
  closeOnSelect?: boolean;

  // Variants
  size?: 'sm' | 'md' | 'lg';
}

// Single date picker props
export interface SingleDatePickerProps extends DatePickerBaseProps {
  mode?: 'single';
  /**
   * Controlled value for the date picker.
   * - `undefined`: Uncontrolled mode (component manages internal state)
   * - `null`: Controlled with no selection
   * - `DateValue`: Controlled with specified date
   */
  value?: DateValue | null;
  /** Default value for uncontrolled usage */
  defaultValue?: DateValue;
  /** Callback when value changes. event.target.value is ISO date string. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Minimum selectable date */
  minValue?: DateValue;
  /** Maximum selectable date */
  maxValue?: DateValue;
  /** Function to determine if a date is unavailable */
  isDateUnavailable?: (date: DateValue) => boolean;
  /** Granularity of date selection */
  granularity?: 'day' | 'hour' | 'minute' | 'second';
  /** Hour cycle (12 or 24) */
  hourCycle?: 12 | 24;
}

// DateTime picker props
export interface DateTimePickerProps extends DatePickerBaseProps {
  mode: 'datetime';
  /**
   * Controlled value for the datetime picker.
   * - `undefined`: Uncontrolled mode (component manages internal state)
   * - `null`: Controlled with no selection
   * - `CalendarDateTime`: Controlled with specified datetime
   */
  value?: CalendarDateTime | null;
  /** Default value for uncontrolled usage */
  defaultValue?: CalendarDateTime;
  /** Callback when value changes. event.target.value is ISO datetime string. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Minimum selectable date */
  minValue?: CalendarDateTime;
  /** Maximum selectable date */
  maxValue?: CalendarDateTime;
  /** Function to determine if a date is unavailable */
  isDateUnavailable?: (date: DateValue) => boolean;
  /** Granularity of selection */
  granularity?: 'hour' | 'minute' | 'second';
  /** Hour cycle (12 or 24) */
  hourCycle?: 12 | 24;
  /** Hide time zone display */
  hideTimeZone?: boolean;
}

// Range picker props
export interface DateRangePickerProps extends DatePickerBaseProps {
  mode: 'range';
  /** Placeholder text for end date input */
  placeholderEnd?: string;
  /** Number of months to display (1 or 2) */
  numOfMonths?: 1 | 2;
  /** Quick select presets */
  presets?: Array<DatePickerPreset>;
  /**
   * Controlled value for the range picker.
   * - `undefined`: Uncontrolled mode (component manages internal state)
   * - `null`: Controlled with no selection
   * - `{ start, end }`: Controlled with specified date range
   */
  value?: { start: CalendarDate; end: CalendarDate } | null;
  /** Default value for uncontrolled usage */
  defaultValue?: { start: CalendarDate; end: CalendarDate };
  /** Callback when value changes. event.target.value is JSON-stringified range object. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Minimum selectable date */
  minValue?: DateValue;
  /** Maximum selectable date */
  maxValue?: DateValue;
  /** Function to determine if a date is unavailable */
  isDateUnavailable?: (date: DateValue) => boolean;
}

// Union type for all DatePicker variants
export type DatePickerProps = SingleDatePickerProps | DateTimePickerProps | DateRangePickerProps;

export const DatePickerDefaultProps: Partial<SingleDatePickerProps> = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  mode: 'single',
  placeholder: 'Select date',
  inline: false,
  clearable: true,
  closeOnSelect: true,
  size: 'md',
  granularity: 'day',
};
