import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { CalendarDateTime, DateValue } from '@internationalized/date';
import {
  type CalendarDate,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  today,
} from '@internationalized/date';
import type { FC } from 'react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

export const DatePickerExamples: FC = () => {
  const [singleDate, setSingleDate] = useState<DateValue | null>(null);
  const [rangeDate, setRangeDate] = useState<{ start: CalendarDate; end: CalendarDate } | null>(
    null
  );
  const [dateTime, setDateTime] = useState<CalendarDateTime | null>(null);

  // Helper to create date presets
  const subDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const now = new Date();
  const todayDate = today(getLocalTimeZone());

  return (
    <Flex.V gap="8" align="stretch" p="4">
      <ExampleSection title="Single Date Selection">
        <DatePicker
          label="Appointment Date"
          placeholder="Choose a date"
          value={singleDate}
          onChange={(e) => setSingleDate(e.target.value ? parseDate(e.target.value) : null)}
          minValue={todayDate}
        />
        {singleDate && (
          <Text mt="2" fontSize="sm" color="fg.muted">
            Selected: {singleDate.toString()}
          </Text>
        )}
      </ExampleSection>

      <ExampleSection title="Date Range with Presets">
        <DatePicker
          label="Travel Dates"
          mode="range"
          numOfMonths={2}
          value={rangeDate}
          onChange={(e) => {
            if (!e.target.value) {
              setRangeDate(null);
              return;
            }
            const parsed = JSON.parse(e.target.value);
            setRangeDate({
              start: parseDate(parsed.start) as CalendarDate,
              end: parseDate(parsed.end) as CalendarDate,
            });
          }}
          presets={[
            { label: 'Last 7 days', value: [subDays(now, 7), now] },
            { label: 'Last 30 days', value: [subDays(now, 30), now] },
            { label: 'Last 90 days', value: [subDays(now, 90), now] },
          ]}
        />
        {rangeDate && (
          <Text mt="2" fontSize="sm" color="fg.muted">
            Selected: {rangeDate.start.toString()} - {rangeDate.end.toString()}
          </Text>
        )}
      </ExampleSection>

      <ExampleSection title="DateTime Selection">
        <DatePicker
          label="Event Start"
          mode="datetime"
          hourCycle={12}
          granularity="minute"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value ? parseDateTime(e.target.value) : null)}
        />
        {dateTime && (
          <Text mt="2" fontSize="sm" color="fg.muted">
            Selected: {dateTime.toString()}
          </Text>
        )}
      </ExampleSection>

      <ExampleSection title="Inline Calendar">
        <DatePicker label="Pick a date" inline />
      </ExampleSection>

      <ExampleSection title="With Constraints">
        <Flex.H gap="4" align="start">
          <DatePicker
            label="Future dates only"
            hint="Cannot select past dates"
            minValue={todayDate}
          />
          <DatePicker
            label="Past dates only"
            hint="Cannot select future dates"
            maxValue={todayDate}
          />
        </Flex.H>
      </ExampleSection>

      <ExampleSection title="Unavailable Dates">
        <DatePicker
          label="Select available date"
          hint="Weekends are unavailable"
          isDateUnavailable={(date) => {
            const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
            return dayOfWeek === 0 || dayOfWeek === 6;
          }}
        />
      </ExampleSection>

      <ExampleSection title="Error State">
        <DatePicker label="Required Date" error="Please select a date" required />
      </ExampleSection>

      <ExampleSection title="Disabled State">
        <DatePicker label="Disabled DatePicker" disabled defaultValue={todayDate} />
      </ExampleSection>
    </Flex.V>
  );
};
