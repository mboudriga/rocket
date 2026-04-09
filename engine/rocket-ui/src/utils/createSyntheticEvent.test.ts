import { createRef } from 'react';
import { createSyntheticChangeEvent, createSyntheticEventFromRef } from './createSyntheticEvent';

describe('createSyntheticChangeEvent', () => {
  describe('with null target', () => {
    it('creates event with synthetic target containing value', () => {
      const event = createSyntheticChangeEvent(null, 'test-value');

      expect(event.target.value).toBe('test-value');
      expect(event.currentTarget.value).toBe('test-value');
    });

    it('creates event with type text when checked is undefined', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(event.target.type).toBe('text');
    });

    it('creates event with type checkbox when checked is provided', () => {
      const event = createSyntheticChangeEvent(null, 'on', true);

      expect(event.target.type).toBe('checkbox');
      expect((event.target as HTMLInputElement).checked).toBe(true);
    });

    it('creates event with checked false', () => {
      const event = createSyntheticChangeEvent(null, '', false);

      expect((event.target as HTMLInputElement).checked).toBe(false);
    });
  });

  describe('with real element target', () => {
    it('sets value on real input element', () => {
      const input = document.createElement('input');
      const event = createSyntheticChangeEvent(input, 'new-value');

      expect(event.target.value).toBe('new-value');
      expect(input.value).toBe('new-value');
    });

    it('sets checked on real checkbox element', () => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      const event = createSyntheticChangeEvent(checkbox, 'on', true);

      expect(event.target.checked).toBe(true);
    });

    it('uses the provided element as target', () => {
      const input = document.createElement('input');
      input.name = 'test-input';
      const event = createSyntheticChangeEvent(input, 'value');

      expect(event.target).toBe(input);
      expect(event.currentTarget).toBe(input);
    });
  });

  describe('event properties', () => {
    it('has correct event metadata', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(event.bubbles).toBe(true);
      expect(event.cancelable).toBe(false);
      expect(event.defaultPrevented).toBe(false);
      expect(event.eventPhase).toBe(0);
      expect(event.isTrusted).toBe(false);
      expect(event.type).toBe('change');
    });

    it('has timestamp', () => {
      const before = Date.now();
      const event = createSyntheticChangeEvent(null, 'test');
      const after = Date.now();

      expect(event.timeStamp).toBeGreaterThanOrEqual(before);
      expect(event.timeStamp).toBeLessThanOrEqual(after);
    });

    it('has nativeEvent', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(event.nativeEvent).toBeInstanceOf(Event);
      expect(event.nativeEvent.type).toBe('change');
    });
  });

  describe('event methods', () => {
    it('preventDefault is a no-op function', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(() => event.preventDefault()).not.toThrow();
      expect(event.preventDefault()).toBeUndefined();
    });

    it('stopPropagation is a no-op function', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(() => event.stopPropagation()).not.toThrow();
      expect(event.stopPropagation()).toBeUndefined();
    });

    it('persist is a no-op function', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(() => event.persist()).not.toThrow();
      expect(event.persist()).toBeUndefined();
    });

    it('isPropagationStopped returns false', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(event.isPropagationStopped()).toBe(false);
    });

    it('isDefaultPrevented returns false', () => {
      const event = createSyntheticChangeEvent(null, 'test');

      expect(event.isDefaultPrevented()).toBe(false);
    });
  });
});

describe('createSyntheticEventFromRef', () => {
  it('creates event from ref with element', () => {
    const ref = createRef<HTMLInputElement>();
    const input = document.createElement('input');
    (ref as { current: HTMLInputElement }).current = input;

    const event = createSyntheticEventFromRef(ref, 'ref-value');

    expect(event.target).toBe(input);
    expect(event.target.value).toBe('ref-value');
  });

  it('creates event from ref with null current', () => {
    const ref = createRef<HTMLInputElement>();

    const event = createSyntheticEventFromRef(ref, 'null-ref-value');

    expect(event.target.value).toBe('null-ref-value');
  });

  it('supports checked parameter', () => {
    const ref = createRef<HTMLInputElement>();
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    (ref as { current: HTMLInputElement }).current = checkbox;

    const event = createSyntheticEventFromRef(ref, 'on', true);

    expect(event.target.checked).toBe(true);
  });
});
