import { Button, IconButton, Input, Popover, Portal, Text } from '@chakra-ui/react';
import { Flex } from '@components/Layout/Flex';
import type { DateValue } from '@internationalized/date';
import { CalendarDate, createCalendar, getLocalTimeZone, today } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { useRangeCalendarState } from '@react-stately/calendar';
import { useEffect, useId, useRef, useState } from 'react';
import { LuCalendar, LuX } from 'react-icons/lu';

/** Convert any DateValue to CalendarDate (extracts just the date portion) */
const toCalendarDate = (value: DateValue): CalendarDate =>
  new CalendarDate(value.year, value.month, value.day);

import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';
import { RangeCalendarComponent } from './Calendar';
import type { DateRangePickerProps } from './DatePicker.types';

const DateRangePicker = ({
  ref,
  value,
  defaultValue,
  onChange,
  minValue,
  maxValue,
  isDateUnavailable,
  placeholder,
  placeholderEnd,
  numOfMonths = 2,
  presets,
  inline,
  clearable,
  disabled,
  readOnly,
  ...props
}: DateRangePickerProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // Use internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>(defaultValue ?? null);
  const currentValue = value !== undefined ? value : internalValue;

  // Track when the value has been cleared to reset calendar state
  // This key changes when transitioning from a value to null, forcing a remount
  const [clearKey, setClearKey] = useState(0);
  const prevValueRef = useRef(currentValue);

  const emitChange = (rangeValue: { start: CalendarDate; end: CalendarDate } | null) => {
    if (onChange) {
      const serialized = rangeValue
        ? JSON.stringify({ start: rangeValue.start.toString(), end: rangeValue.end.toString() })
        : '';
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, serialized);
      onChange(syntheticEvent);
    }
  };

  useEffect(() => {
    // If we had a value and now it's null, increment key to force calendar reset
    if (prevValueRef.current !== null && currentValue === null) {
      setClearKey((k) => k + 1);
    }
    prevValueRef.current = currentValue;
  }, [currentValue]);

  const calendarState = useRangeCalendarState({
    // Pass null explicitly when cleared - don't convert to undefined
    // undefined = uncontrolled mode (keeps internal state)
    // null = explicitly no selection
    value: currentValue === null ? null : currentValue,
    onChange: (newValue) => {
      const rangeValue = newValue as { start: CalendarDate; end: CalendarDate } | null;
      if (value === undefined) {
        setInternalValue(rangeValue);
      }
      emitChange(rangeValue);
      if (rangeValue?.start && rangeValue?.end) {
        setIsOpen(false);
      }
    },
    minValue,
    maxValue,
    isDateUnavailable,
    locale,
    createCalendar,
    visibleDuration: { months: numOfMonths },
    isDisabled: disabled,
    isReadOnly: readOnly,
  });

  // Reset calendar view when popover opens - show selected range or current date.
  // Use refs for unstable references to avoid infinite re-render loop:
  // calendarState.setFocusedDate is recreated every render by React Stately.
  const calendarStateRef = useRef(calendarState);
  calendarStateRef.current = calendarState;
  const currentValueRef2 = useRef(currentValue);
  currentValueRef2.current = currentValue;

  useEffect(() => {
    if (isOpen) {
      const targetDate = currentValueRef2.current?.start ?? today(getLocalTimeZone());
      calendarStateRef.current.setFocusedDate(targetDate);
    }
  }, [isOpen]);

  const formatDate = (date: DateValue | null | undefined): string => {
    if (!date) {
      return '';
    }
    return new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(
      date.toDate(getLocalTimeZone())
    );
  };

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue(null);
    }
    emitChange(null);
  };

  // Check if a preset is entirely outside the valid date range
  const isPresetDisabled = (presetValue: [Date, Date]): boolean => {
    const [start, end] = presetValue;
    const startDate = new CalendarDate(start.getFullYear(), start.getMonth() + 1, start.getDate());
    const endDate = new CalendarDate(end.getFullYear(), end.getMonth() + 1, end.getDate());

    // Entire preset is before minValue
    if (minValue && endDate.compare(toCalendarDate(minValue)) < 0) {
      return true;
    }
    // Entire preset is after maxValue
    if (maxValue && startDate.compare(toCalendarDate(maxValue)) > 0) {
      return true;
    }
    return false;
  };

  const handlePresetSelect = (presetValue: [Date, Date]) => {
    const [start, end] = presetValue;
    let startDate = new CalendarDate(start.getFullYear(), start.getMonth() + 1, start.getDate());
    let endDate = new CalendarDate(end.getFullYear(), end.getMonth() + 1, end.getDate());

    // Clamp preset dates to minValue/maxValue constraints
    if (minValue) {
      const minDate = toCalendarDate(minValue);
      if (startDate.compare(minDate) < 0) {
        startDate = minDate;
      }
      if (endDate.compare(minDate) < 0) {
        // Entire preset is before minValue, don't apply
        return;
      }
    }
    if (maxValue) {
      const maxDate = toCalendarDate(maxValue);
      if (endDate.compare(maxDate) > 0) {
        endDate = maxDate;
      }
      if (startDate.compare(maxDate) > 0) {
        // Entire preset is after maxValue, don't apply
        return;
      }
    }

    // Validate that clamping didn't invert the range (start must be <= end)
    if (startDate.compare(endDate) > 0) {
      return;
    }

    const rangeValue = { start: startDate, end: endDate };

    if (value === undefined) {
      setInternalValue(rangeValue);
    }
    emitChange(rangeValue);
    setIsOpen(false);
  };

  if (inline) {
    return (
      <FieldWrapper {...poppedProps}>
        <Flex.H ref={ref} {...otherProps} align="start" gap={4}>
          {presets && presets.length > 0 && (
            <Flex.V align="stretch" gap={1} p={2} bg="bg.subtle" borderRadius="md">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  size="sm"
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => handlePresetSelect(preset.value)}
                  disabled={isPresetDisabled(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </Flex.V>
          )}
          <RangeCalendarComponent key={clearKey} state={calendarState} numOfMonths={numOfMonths} />
        </Flex.H>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper {...poppedProps}>
      <Flex.H ref={ref} gap={2} align="center">
        <input ref={inputRef} type="hidden" aria-hidden="true" />
        <Input
          id={`${uniqueId}-start`}
          value={formatDate(currentValue?.start)}
          placeholder={placeholder || 'Start date'}
          readOnly
          flex={1}
          onClick={() => !disabled && !readOnly && setIsOpen(true)}
          cursor={disabled || readOnly ? 'default' : 'pointer'}
          bg="bg.panel"
          borderColor="border"
        />
        <Text color="fg.muted">–</Text>
        <Input
          id={`${uniqueId}-end`}
          value={formatDate(currentValue?.end)}
          placeholder={placeholderEnd || 'End date'}
          readOnly
          flex={1}
          onClick={() => !disabled && !readOnly && setIsOpen(true)}
          cursor={disabled || readOnly ? 'default' : 'pointer'}
          bg="bg.panel"
          borderColor="border"
        />
        {clearable && currentValue && (
          <IconButton
            aria-label="Clear dates"
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
              <Popover.Content shadow="lg" borderRadius="lg" width="auto">
                <Flex.H align="start" gap={0} bg="bg.panel" borderRadius="lg" overflow="hidden">
                  {presets && presets.length > 0 && (
                    <Flex.V
                      align="stretch"
                      gap={1}
                      p={3}
                      bg="bg.subtle"
                      borderRightWidth="1px"
                      borderColor="border"
                      minW="140px"
                    >
                      <Text fontSize="xs" fontWeight="semibold" color="fg.muted" mb={1}>
                        Quick Select
                      </Text>
                      {presets.map((preset) => (
                        <Button
                          key={preset.label}
                          size="sm"
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={() => handlePresetSelect(preset.value)}
                          disabled={isPresetDisabled(preset.value)}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </Flex.V>
                  )}
                  <RangeCalendarComponent
                    key={clearKey}
                    state={calendarState}
                    numOfMonths={numOfMonths}
                  />
                </Flex.H>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Flex.H>
    </FieldWrapper>
  );
};

export { DateRangePicker };
