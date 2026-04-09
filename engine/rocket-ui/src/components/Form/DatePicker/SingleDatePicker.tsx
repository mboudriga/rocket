import { Box, IconButton, Input, Popover, Portal } from '@chakra-ui/react';
import { Flex } from '@components/Layout/Flex';
import type { DateValue } from '@internationalized/date';
import { CalendarDate, createCalendar, getLocalTimeZone, today } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { useEffect, useRef, useState } from 'react';
import { LuCalendar, LuX } from 'react-icons/lu';

import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';
import { CalendarComponent } from './Calendar';
import type { SingleDatePickerProps } from './DatePicker.types';

const SingleDatePicker = ({
  ref,
  value,
  defaultValue,
  onChange,
  minValue,
  maxValue,
  isDateUnavailable,
  placeholder,
  inline,
  clearable,
  closeOnSelect = true,
  disabled,
  readOnly,
  ...props
}: SingleDatePickerProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<DateValue | null>(defaultValue ?? null);
  const currentValue = value !== undefined ? value : internalValue;

  const handleDateChange = (newValue: DateValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, newValue.toString());
      onChange(syntheticEvent);
    }
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const calendarState = useCalendarState({
    // Pass null explicitly when cleared - don't convert to undefined
    // undefined = uncontrolled mode (keeps internal state)
    // null = explicitly no selection
    value: currentValue === null ? null : currentValue,
    onChange: handleDateChange,
    minValue,
    maxValue,
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
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
        currentValue.toDate(getLocalTimeZone())
      )
    : '';

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue(null);
    }
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, '');
      onChange(syntheticEvent);
    }
  };

  // Inline mode - render calendar directly
  if (inline) {
    return (
      <FieldWrapper {...poppedProps}>
        <Box ref={ref} {...otherProps}>
          <CalendarComponent state={calendarState} />
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
          placeholder={placeholder}
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
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Flex.H>
    </FieldWrapper>
  );
};

export { SingleDatePicker };
