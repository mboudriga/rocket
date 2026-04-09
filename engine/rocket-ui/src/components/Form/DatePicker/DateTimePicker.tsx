import { Box, IconButton, Input, Popover, Portal, Text } from '@chakra-ui/react';
import { Flex } from '@components/Layout/Flex';
import type { DateValue } from '@internationalized/date';
import {
  CalendarDate,
  CalendarDateTime,
  createCalendar,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { useEffect, useId, useRef, useState } from 'react';
import { LuCalendar, LuX } from 'react-icons/lu';

import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';
import { CalendarComponent } from './Calendar';
import type { DateTimePickerProps } from './DatePicker.types';

const DateTimePicker = ({
  ref,
  value,
  defaultValue,
  onChange,
  minValue,
  maxValue,
  isDateUnavailable,
  hourCycle = 12,
  placeholder,
  inline,
  clearable,
  disabled,
  readOnly,
  ...props
}: DateTimePickerProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeId = useId();

  // Use internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<DateValue | null>(defaultValue ?? null);
  const currentValue = value !== undefined ? value : internalValue;

  const emitChange = (dateTime: CalendarDateTime | null) => {
    if (onChange) {
      const serialized = dateTime ? dateTime.toString() : '';
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, serialized);
      onChange(syntheticEvent);
    }
  };

  // Time state
  const [hour, setHour] = useState(hourCycle === 12 ? 12 : 0);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  // Track if user is actively editing time inputs to prevent sync race condition.
  // The useEffect that syncs from controlled value will skip while this is true.
  // requestAnimationFrame in handleTimeBlur ensures the flag isn't cleared until
  // after React's batch update cycle completes, preventing overwrite of user input.
  const isEditingTimeRef = useRef(false);

  // Initialize time state from existing value, but skip if user is actively editing
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: time state sync requires conditional logic
  useEffect(() => {
    if (isEditingTimeRef.current) {
      return; // Skip sync while user is typing
    }
    if (currentValue && 'hour' in currentValue) {
      const dateTime = currentValue as CalendarDateTime;
      const h = dateTime.hour;
      const m = dateTime.minute;
      setMinute(m);
      if (hourCycle === 12) {
        setPeriod(h >= 12 ? 'PM' : 'AM');
        setHour(h === 0 ? 12 : h > 12 ? h - 12 : h);
      } else {
        setHour(h);
      }
    }
  }, [currentValue, hourCycle]);

  // Convert hour to 24-hour format for storage
  const getHour24 = (h: number, p: 'AM' | 'PM') => {
    if (hourCycle === 24) {
      return h;
    }
    if (p === 'AM') {
      return h === 12 ? 0 : h;
    } else {
      return h === 12 ? 12 : h + 12;
    }
  };

  // Update the datetime value when time changes
  const updateTimeValue = (newHour: number, newMinute: number, newPeriod: 'AM' | 'PM') => {
    if (currentValue) {
      const dateWithTime = new CalendarDateTime(
        currentValue.year,
        currentValue.month,
        currentValue.day,
        getHour24(newHour, newPeriod),
        newMinute
      );
      if (value === undefined) {
        setInternalValue(dateWithTime);
      }
      emitChange(dateWithTime);
    }
  };

  // Track editing state to prevent race condition with external sync
  const handleTimeFocus = () => {
    isEditingTimeRef.current = true;
  };

  const handleTimeBlur = () => {
    // Use requestAnimationFrame to ensure state settles before allowing sync
    requestAnimationFrame(() => {
      isEditingTimeRef.current = false;
    });
  };

  // Validation handlers
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newHour =
      hourCycle === 12 ? Math.max(1, Math.min(12, val)) : Math.max(0, Math.min(23, val));
    setHour(newHour);
    updateTimeValue(newHour, minute, period);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newMinute = Math.max(0, Math.min(59, val));
    setMinute(newMinute);
    updateTimeValue(hour, newMinute, period);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = e.target.value as 'AM' | 'PM';
    setPeriod(newPeriod);
    updateTimeValue(hour, minute, newPeriod);
  };

  // Keyboard navigation for time inputs
  const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const delta = e.key === 'ArrowUp' ? 1 : -1;
      const min = hourCycle === 12 ? 1 : 0;
      const max = hourCycle === 12 ? 12 : 23;
      let newHour = hour + delta;
      // Wrap around
      if (newHour > max) {
        newHour = min;
      }
      if (newHour < min) {
        newHour = max;
      }
      setHour(newHour);
      updateTimeValue(newHour, minute, period);
    }
  };

  const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const delta = e.key === 'ArrowUp' ? 1 : -1;
      let newMinute = minute + delta;
      // Wrap around
      if (newMinute > 59) {
        newMinute = 0;
      }
      if (newMinute < 0) {
        newMinute = 59;
      }
      setMinute(newMinute);
      updateTimeValue(hour, newMinute, period);
    }
  };

  const calendarState = useCalendarState({
    value: currentValue === null ? null : currentValue,
    onChange: (newValue: DateValue) => {
      // Merge date with current time state
      const dateWithTime = new CalendarDateTime(
        newValue.year,
        newValue.month,
        newValue.day,
        getHour24(hour, period),
        minute
      );
      if (value === undefined) {
        setInternalValue(dateWithTime);
      }
      emitChange(dateWithTime);
    },
    minValue: minValue as DateValue | undefined,
    maxValue: maxValue as DateValue | undefined,
    isDateUnavailable,
    locale,
    createCalendar,
    isDisabled: disabled,
    isReadOnly: readOnly,
  });

  // Reset calendar view when popover opens - show selected date or current date.
  // Use refs for unstable references to avoid infinite re-render loop:
  // calendarState.setFocusedDate is recreated every render by React Stately.
  const calendarStateRef = useRef(calendarState);
  calendarStateRef.current = calendarState;
  const currentValueRef = useRef(currentValue);
  currentValueRef.current = currentValue;

  useEffect(() => {
    if (isOpen) {
      const targetDate = currentValueRef.current ?? today(getLocalTimeZone());
      const focusDate =
        'hour' in targetDate
          ? new CalendarDate(targetDate.year, targetDate.month, targetDate.day)
          : targetDate;
      calendarStateRef.current.setFocusedDate(focusDate);
    }
  }, [isOpen]);

  const formattedValue = currentValue
    ? new Intl.DateTimeFormat(locale, {
        dateStyle: 'short',
        timeStyle: 'short',
        hour12: hourCycle === 12,
      }).format(currentValue.toDate(getLocalTimeZone()))
    : '';

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue(null);
    }
    emitChange(null);
  };

  const TimeInputSection = (
    <Flex.H p={3} borderTopWidth="1px" borderColor="border" justify="center" gap={2} align="center">
      <Input
        id={`${timeId}-hour`}
        type="number"
        min={hourCycle === 12 ? 1 : 0}
        max={hourCycle === 12 ? 12 : 23}
        value={hour}
        onChange={handleHourChange}
        onFocus={handleTimeFocus}
        onBlur={handleTimeBlur}
        onKeyDown={handleHourKeyDown}
        width="60px"
        textAlign="center"
        aria-label="Hour"
        bg="bg.panel"
        borderColor="border"
      />
      <Text fontWeight="bold">:</Text>
      <Input
        id={`${timeId}-minute`}
        type="number"
        min={0}
        max={59}
        value={minute}
        onChange={handleMinuteChange}
        onFocus={handleTimeFocus}
        onBlur={handleTimeBlur}
        onKeyDown={handleMinuteKeyDown}
        width="60px"
        textAlign="center"
        aria-label="Minute"
        bg="bg.panel"
        borderColor="border"
      />
      {hourCycle === 12 && (
        <select
          value={period}
          onChange={handlePeriodChange}
          style={{
            height: '40px',
            padding: '0 28px 0 8px',
            borderRadius: '6px',
            border: '1px solid var(--chakra-colors-border)',
            background: 'var(--chakra-colors-bg-panel)',
            appearance: 'none',
            WebkitAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 8px center',
            cursor: 'pointer',
          }}
          aria-label="AM/PM"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      )}
    </Flex.H>
  );

  if (inline) {
    return (
      <FieldWrapper {...poppedProps}>
        <Box ref={ref} {...otherProps}>
          <CalendarComponent state={calendarState} />
          {TimeInputSection}
        </Box>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper {...poppedProps}>
      <Flex.H ref={ref} gap={2}>
        <input ref={inputRef} type="hidden" aria-hidden="true" />
        <Input
          value={formattedValue}
          placeholder={placeholder || 'Select date and time'}
          readOnly
          flex={1}
          onClick={() => !disabled && !readOnly && setIsOpen(true)}
          cursor={disabled || readOnly ? 'default' : 'pointer'}
          bg="bg.panel"
          borderColor="border"
        />
        {clearable && currentValue && (
          <IconButton
            aria-label="Clear date"
            size="md"
            variant="ghost"
            onClick={handleClear}
            disabled={disabled}
          >
            <LuX />
          </IconButton>
        )}
        <Popover.Root open={isOpen} onOpenChange={(details) => setIsOpen(details.open)} lazyMount={false} unmountOnExit={false}>
          <Popover.Trigger asChild>
            <IconButton
              aria-label="Open calendar"
              size="md"
              variant="outline"
              disabled={disabled || readOnly}
            >
              <LuCalendar />
            </IconButton>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content shadow="lg" borderRadius="lg">
                <CalendarComponent state={calendarState} />
                {TimeInputSection}
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Flex.H>
    </FieldWrapper>
  );
};

export { DateTimePicker };
