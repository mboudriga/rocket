/**
 * Result type for popProps operations.
 * Uses Record<string, unknown> for flexibility while maintaining type safety at usage site.
 */
interface PopPropsReturnData<
  TPoppedProps extends Record<string, unknown> = Record<string, unknown>,
  TOtherProps extends Record<string, unknown> = Record<string, unknown>,
> {
  poppedProps: TPoppedProps;
  otherProps: TOtherProps;
}

/**
 * Separates props into two groups based on the specified keys.
 * Keys in the query array go to poppedProps, the rest go to otherProps.
 */
export const popProps = <T extends Record<string, unknown>>(
  props: T,
  query: ReadonlyArray<string>
): PopPropsReturnData => {
  const poppedProps: Record<string, unknown> = {};
  const otherProps: Record<string, unknown> = {};

  for (const [prop, value] of Object.entries(props)) {
    if (query.includes(prop)) {
      poppedProps[prop] = value;
    } else {
      otherProps[prop] = value;
    }
  }

  return { poppedProps, otherProps };
};

const MARGIN_PROPS = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginStart',
  'marginEnd',
  'marginX',
  'marginY',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
] as const;

const FIELD_WRAPPER_PROPS = [
  'orientation',
  'label',
  'hint',
  'error',
  'disabled',
  'invalid',
  'readOnly',
  'required',
  ...MARGIN_PROPS,
] as const;

/**
 * Separates margin-related props from other props.
 * Useful for extracting margin props to apply to a wrapper element.
 */
export const popMarginProps = <T extends Record<string, unknown>>(
  props: T,
  additionalKeys: ReadonlyArray<string> = []
): PopPropsReturnData => {
  return popProps(props, [...MARGIN_PROPS, ...additionalKeys]);
};

/**
 * Separates FieldWrapper-related props from other props.
 * Extracts: orientation, label, hint, error, disabled, invalid, readOnly, required, and all margin props.
 */
export const popFieldWrapperProps = <T extends Record<string, unknown>>(
  props: T,
  additionalKeys: ReadonlyArray<string> = []
): PopPropsReturnData => {
  return popProps(props, [...FIELD_WRAPPER_PROPS, ...additionalKeys]);
};
