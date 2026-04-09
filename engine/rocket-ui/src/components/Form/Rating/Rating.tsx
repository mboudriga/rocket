import { RatingGroup } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import type { RatingProps } from './Rating.types';

const Rating = ({
  ref,
  onChange,
  ...props
}: RatingProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (details: { value: number }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, String(details.value));
      onChange(syntheticEvent);
    }
  };

  // Fix Ark UI bug: SVGs get aria-hidden="" (empty) instead of aria-hidden="true"
  const controlRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    for (const svg of node.querySelectorAll('svg[aria-hidden]')) {
      svg.setAttribute('aria-hidden', 'true');
    }
  }, []);

  const hasFieldProps = !!(
    poppedProps.label ||
    poppedProps.hint ||
    poppedProps.error ||
    poppedProps.required ||
    poppedProps.invalid
  );

  const label = (poppedProps.label as string) || 'Rating';

  const ratingGroup = (
    <RatingGroup.Root ref={ref} onValueChange={handleValueChange} aria-label={label} {...otherProps}>
      {!hasFieldProps && (
        <RatingGroup.Label asChild>
          <label style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
            {label}
          </label>
        </RatingGroup.Label>
      )}
      <RatingGroup.HiddenInput ref={inputRef} />
      <RatingGroup.Control ref={controlRef}>
        <RatingGroup.Items />
      </RatingGroup.Control>
    </RatingGroup.Root>
  );

  return hasFieldProps ? <FieldWrapper {...poppedProps}>{ratingGroup}</FieldWrapper> : ratingGroup;
};

export { Rating };
