import { SegmentGroup } from '@chakra-ui/react';
import { useCallback, useMemo, useRef } from 'react';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import type { SegmentedControlProps } from './SegmentedControl.types';

const SegmentedControl = ({
  ref,
  items,
  onChange,
  ...props
}: SegmentedControlProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const label = poppedProps.label as string | undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (details: { value: string | null }) => {
    if (onChange && details.value) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.value);
      onChange(syntheticEvent);
    }
  };

  const segmentItems = useMemo(
    () =>
      items?.map(({ value, label, disabled }, index) => (
        <SegmentGroup.Item key={value} value={value} disabled={disabled}>
          <SegmentGroup.ItemText>{label}</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput ref={index === 0 ? inputRef : undefined} />
        </SegmentGroup.Item>
      )) || null,
    [items]
  );

  return (
    <FieldWrapper {...poppedProps}>
      <SegmentGroup.Root
        ref={ref}
        onValueChange={handleValueChange}
        aria-label={label || 'Options'}
        {...otherProps}
      >
        <HiddenLabel label={label || 'Options'} />
        <SegmentGroup.Indicator />
        {segmentItems}
      </SegmentGroup.Root>
    </FieldWrapper>
  );
};

// Renders a visually hidden label element with the ID that Ark's aria-labelledby expects
const HiddenLabel = ({ label }: { label: string }) => {
  const labelRef = useCallback((node: HTMLSpanElement | null) => {
    if (!node) return;
    const root = node.closest('[data-scope="segment-group"][data-part="root"]');
    if (root?.id) {
      node.id = `${root.id}:label`;
    }
  }, []);

  return (
    <span
      ref={labelRef}
      style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
    >
      {label}
    </span>
  );
};

export { SegmentedControl };
