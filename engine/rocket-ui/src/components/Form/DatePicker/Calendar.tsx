import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import { Flex } from '@components/Layout/Flex';
import {
  type CalendarDate,
  getLocalTimeZone,
  getWeeksInMonth,
  today,
} from '@internationalized/date';
import {
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useRangeCalendar,
} from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { useRef } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

// Calendar Cell Component
interface CalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
}

const CalendarCell = ({ state, date }: CalendarCellProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const isToday = date.compare(today(getLocalTimeZone())) === 0;

  // Range selection highlighting - with proper handling for partial selection
  const isInRange = (() => {
    if (!('highlightedRange' in state)) {
      return false;
    }
    const rangeState = state as RangeCalendarState;
    if (!rangeState.highlightedRange) {
      return false;
    }

    const { start, end } = rangeState.highlightedRange;

    // If there's a committed value, always show that range (including single-day ranges)
    if (rangeState.value) {
      // For single-day ranges (start === end), the selected date should still be in range
      return date.compare(start) >= 0 && date.compare(end) <= 0;
    }

    // If anchor is set but no value committed yet, we're in partial selection
    if (rangeState.anchorDate) {
      const anchor = rangeState.anchorDate;

      // Detect "just clicked first date, no hover yet" state:
      // If highlighted range is just the single anchor point, don't show range highlight.
      // This handles the initial click for ANY date including today.
      if (start.compare(anchor) === 0 && end.compare(anchor) === 0) {
        return false;
      }

      // User has actively hovered/moved to a different date - show the range
      return date.compare(start) >= 0 && date.compare(end) <= 0;
    }

    return false;
  })();

  // Per a11y requirements: isDisabled = cannot focus, isUnavailable = CAN focus but cannot select
  // Unavailable dates need 4.5:1 contrast since they're keyboard-navigable
  return (
    <Box {...cellProps} flex="1" minW="36px" display="flex" justifyContent="center">
      <Button
        {...buttonProps}
        ref={ref}
        size="sm"
        variant={isSelected ? 'solid' : 'ghost'}
        colorPalette={isSelected || isInRange ? 'blue' : 'gray'}
        width="36px"
        height="36px"
        minWidth="36px"
        padding={0}
        fontWeight={isToday ? 'bold' : 'normal'}
        borderWidth={isToday && !isSelected ? '2px' : '0'}
        borderColor={isToday ? 'colorPalette.solid' : 'transparent'}
        borderRadius="full"
        bg={isInRange && !isSelected ? 'colorPalette.subtle' : undefined}
        opacity={isOutsideVisibleRange ? 0.4 : isDisabled ? 0.4 : isUnavailable ? 0.6 : 1}
        textDecoration={isUnavailable ? 'line-through' : undefined}
        _disabled={{
          opacity: 0.4,
          cursor: 'not-allowed',
        }}
        // Only truly disabled dates should be disabled; unavailable dates remain focusable
        disabled={isDisabled}
        aria-disabled={isUnavailable || undefined}
      >
        {formattedDate}
      </Button>
    </Box>
  );
};

// Calendar Grid Component
interface CalendarGridProps {
  state: CalendarState | RangeCalendarState;
  offset?: { months: number };
}

const CalendarGrid = ({ state, offset = { months: 0 } }: CalendarGridProps) => {
  const { locale } = useLocale();
  const startDate = state.visibleRange.start.add(offset);
  const { gridProps, headerProps: _headerProps, weekDays } = useCalendarGrid({ startDate }, state);

  const weeksInMonth = getWeeksInMonth(startDate, locale);

  // Extract only ARIA attributes from gridProps and headerProps
  const { role: gridRole, 'aria-label': gridAriaLabel } = gridProps;
  const safeGridProps = { role: gridRole, 'aria-label': gridAriaLabel };

  return (
    <Box {...safeGridProps}>
      {/* Header row with day names */}
      <Flex.H role="row" gap={1} mb={2}>
        {weekDays.map((day, index) => (
          <Box key={index} flex="1" minW="36px" textAlign="center" role="columnheader">
            <Text fontSize="xs" fontWeight="medium" color="fg.muted">
              {day}
            </Text>
          </Box>
        ))}
      </Flex.H>

      {/* Calendar weeks - each wrapped in role="row" for ARIA grid compliance */}
      {[...Array(weeksInMonth)].map((_, weekIndex) => (
        <Flex.H key={weekIndex} role="row" gap={1} mb={1}>
          {state
            .getDatesInWeek(weekIndex, startDate)
            .map((date, dayIndex) =>
              date ? (
                <CalendarCell key={`${weekIndex}-${dayIndex}`} state={state} date={date} />
              ) : (
                <Box key={`${weekIndex}-${dayIndex}`} flex="1" minW="36px" role="gridcell" />
              )
            )}
        </Flex.H>
      ))}
    </Box>
  );
};

// Single Calendar Component
interface CalendarComponentProps {
  state: CalendarState;
}

const CalendarComponent = ({ state }: CalendarComponentProps) => {
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar({}, state);

  // Extract onPress and convert to onClick, filter out onFocusChange
  const { onPress: onPrevPress, onFocusChange: _prevFocus, ...prevProps } = prevButtonProps;
  const { onPress: onNextPress, onFocusChange: _nextFocus, ...nextProps } = nextButtonProps;

  // Create wrapper handlers that ignore the MouseEvent and call onPress without arguments
  const handlePrevClick = () => {
    onPrevPress?.(null as never);
  };
  const handleNextClick = () => {
    onNextPress?.(null as never);
  };

  // Extract only ARIA attributes from calendarProps
  const { role, 'aria-label': ariaLabel } = calendarProps;
  const safeCalendarProps = { role, 'aria-label': ariaLabel };

  return (
    <Box {...safeCalendarProps} p={3} bg="bg.panel">
      <Flex.H justify="space-between" align="center" mb={4} p={2} bg="bg.subtle" borderRadius="md">
        <IconButton
          {...prevProps}
          onClick={handlePrevClick}
          aria-label="Previous month"
          size="sm"
          variant="ghost"
        >
          <LuChevronLeft />
        </IconButton>
        <Text fontWeight="semibold" fontSize="md">
          {title}
        </Text>
        <IconButton
          {...nextProps}
          onClick={handleNextClick}
          aria-label="Next month"
          size="sm"
          variant="ghost"
        >
          <LuChevronRight />
        </IconButton>
      </Flex.H>
      <CalendarGrid state={state} />
    </Box>
  );
};

// Range Calendar Component with dual months
interface RangeCalendarComponentProps {
  state: RangeCalendarState;
  numOfMonths?: 1 | 2;
}

const RangeCalendarComponent = ({ state, numOfMonths = 2 }: RangeCalendarComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(
    {},
    state,
    ref
  );

  // Extract onPress and convert to onClick, filter out onFocusChange
  const { onPress: onPrevPress, onFocusChange: _prevFocus, ...prevProps } = prevButtonProps;
  const { onPress: onNextPress, onFocusChange: _nextFocus, ...nextProps } = nextButtonProps;

  // Create wrapper handlers that ignore the MouseEvent and call onPress without arguments
  const handlePrevClick = () => {
    onPrevPress?.(null as never);
  };
  const handleNextClick = () => {
    onNextPress?.(null as never);
  };

  // For dual month view, show next month's title as well
  const nextMonthStart = state.visibleRange.start.add({ months: 1 });
  const nextMonthTitle = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(nextMonthStart.toDate(getLocalTimeZone()));

  // Extract only ARIA attributes from calendarProps, ignore any styling
  const { role, 'aria-label': ariaLabel } = calendarProps;
  const safeCalendarProps = { role, 'aria-label': ariaLabel };

  return (
    <Box {...safeCalendarProps} ref={ref} p={3} bg="bg.panel">
      <Flex.H justify="space-between" align="center" mb={4} p={2} bg="bg.subtle" borderRadius="md">
        <IconButton
          {...prevProps}
          onClick={handlePrevClick}
          aria-label="Previous month"
          size="sm"
          variant="ghost"
        >
          <LuChevronLeft />
        </IconButton>

        <Flex.H gap={numOfMonths === 2 ? 16 : 0}>
          <Flex.H justifyContent="center">
            <Text fontWeight="semibold" fontSize="md" whiteSpace="nowrap">
              {title}
            </Text>
          </Flex.H>

          {numOfMonths === 2 && (
            <Flex.H justifyContent="center">
              <Text fontWeight="semibold" fontSize="md" whiteSpace="nowrap">
                {nextMonthTitle}
              </Text>
            </Flex.H>
          )}
        </Flex.H>

        <IconButton
          {...nextProps}
          onClick={handleNextClick}
          aria-label="Next month"
          size="sm"
          variant="ghost"
        >
          <LuChevronRight />
        </IconButton>
      </Flex.H>
      <Flex.H gap={6} align="start">
        <CalendarGrid state={state} />
        {numOfMonths === 2 && <CalendarGrid state={state} offset={{ months: 1 }} />}
      </Flex.H>
    </Box>
  );
};

export { CalendarComponent, RangeCalendarComponent };
