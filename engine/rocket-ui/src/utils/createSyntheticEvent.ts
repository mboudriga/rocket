/**
 * Creates a synthetic change event that mimics a native React change event.
 * Used for components that don't have a native input element (e.g., Checkbox, RadioGroup, Select).
 *
 * This enables React Hook Form compatibility via the `{...register('fieldName')}` pattern.
 */
export function createSyntheticChangeEvent<
  T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
>(target: T | null, value: string, checked?: boolean): React.ChangeEvent<T> {
  // Create a minimal target object if no real element exists
  const syntheticTarget =
    target ??
    ({
      value,
      checked,
      name: '',
      type: checked !== undefined ? 'checkbox' : 'text',
    } as unknown as T);

  // Update target properties
  if (target) {
    // For real elements, we need to set the value without triggering a re-render
    Object.defineProperty(target, 'value', {
      writable: true,
      value,
    });
    if (checked !== undefined) {
      Object.defineProperty(target, 'checked', {
        writable: true,
        value: checked,
      });
    }
  }

  const event: React.ChangeEvent<T> = {
    target: syntheticTarget,
    currentTarget: syntheticTarget,
    bubbles: true,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    nativeEvent: new Event('change', { bubbles: true }),
    preventDefault: () => {
      /* no-op */
    },
    stopPropagation: () => {
      /* no-op */
    },
    isPropagationStopped: () => false,
    isDefaultPrevented: () => false,
    persist: () => {
      /* no-op */
    },
    timeStamp: Date.now(),
    type: 'change',
  };

  return event;
}

/**
 * Creates a synthetic change event from a hidden input reference.
 * This is the preferred method when the component has a hidden input element.
 */
export function createSyntheticEventFromRef<T extends HTMLInputElement>(
  inputRef: React.RefObject<T | null>,
  value: string,
  checked?: boolean
): React.ChangeEvent<T> {
  const target = inputRef.current;
  return createSyntheticChangeEvent(target, value, checked);
}
