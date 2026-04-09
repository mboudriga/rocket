import {
  DatePickerDefaultProps,
  type DatePickerProps,
  type DateRangePickerProps,
  type DateTimePickerProps,
  type SingleDatePickerProps,
} from './DatePicker.types';
import { DateRangePicker } from './DateRangePicker';
import { DateTimePicker } from './DateTimePicker';
import { SingleDatePicker } from './SingleDatePicker';

// Main DatePicker component that delegates to the appropriate implementation
const DatePicker = ({
  ref,
  mode = DatePickerDefaultProps.mode,
  ...props
}: DatePickerProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  if (mode === 'range') {
    return <DateRangePicker ref={ref} {...(props as DateRangePickerProps)} />;
  }

  if (mode === 'datetime') {
    return <DateTimePicker ref={ref} {...(props as DateTimePickerProps)} />;
  }

  return <SingleDatePicker ref={ref} {...(props as SingleDatePickerProps)} />;
};

export { DatePicker };
