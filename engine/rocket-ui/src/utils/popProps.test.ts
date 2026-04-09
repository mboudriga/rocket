import { describe, expect, it } from 'vitest';

import { popFieldWrapperProps, popMarginProps, popProps } from './popProps';

describe('popProps', () => {
  describe('popProps()', () => {
    it('separates specified props from other props', () => {
      const props = { name: 'John', age: 30, city: 'NYC', country: 'USA' };
      const result = popProps(props, ['name', 'city']);

      expect(result.poppedProps).toEqual({ name: 'John', city: 'NYC' });
      expect(result.otherProps).toEqual({ age: 30, country: 'USA' });
    });

    it('returns empty poppedProps when no keys match', () => {
      const props = { name: 'John', age: 30 };
      const result = popProps(props, ['email', 'phone']);

      expect(result.poppedProps).toEqual({});
      expect(result.otherProps).toEqual({ name: 'John', age: 30 });
    });

    it('returns empty otherProps when all keys match', () => {
      const props = { name: 'John', age: 30 };
      const result = popProps(props, ['name', 'age']);

      expect(result.poppedProps).toEqual({ name: 'John', age: 30 });
      expect(result.otherProps).toEqual({});
    });

    it('handles empty props object', () => {
      const result = popProps({}, ['name', 'age']);

      expect(result.poppedProps).toEqual({});
      expect(result.otherProps).toEqual({});
    });

    it('handles empty query array', () => {
      const props = { name: 'John', age: 30 };
      const result = popProps(props, []);

      expect(result.poppedProps).toEqual({});
      expect(result.otherProps).toEqual({ name: 'John', age: 30 });
    });

    it('preserves undefined and null values', () => {
      const props = { name: undefined, age: null, city: 'NYC' };
      const result = popProps(props, ['name', 'age']);

      expect(result.poppedProps).toEqual({ name: undefined, age: null });
      expect(result.otherProps).toEqual({ city: 'NYC' });
    });

    it('handles boolean and number values', () => {
      const props = { active: true, count: 0, disabled: false };
      const result = popProps(props, ['active', 'disabled']);

      expect(result.poppedProps).toEqual({ active: true, disabled: false });
      expect(result.otherProps).toEqual({ count: 0 });
    });
  });

  describe('popMarginProps()', () => {
    it('extracts all margin props', () => {
      const props = {
        margin: '10px',
        marginTop: '5px',
        marginRight: '5px',
        marginBottom: '5px',
        marginLeft: '5px',
        color: 'red',
        size: 'md',
      };
      const result = popMarginProps(props);

      expect(result.poppedProps).toEqual({
        margin: '10px',
        marginTop: '5px',
        marginRight: '5px',
        marginBottom: '5px',
        marginLeft: '5px',
      });
      expect(result.otherProps).toEqual({ color: 'red', size: 'md' });
    });

    it('extracts shorthand margin props (m, mt, mr, mb, ml, mx, my)', () => {
      const props = {
        m: 4,
        mt: 2,
        mr: 2,
        mb: 2,
        ml: 2,
        mx: 3,
        my: 3,
        padding: 4,
      };
      const result = popMarginProps(props);

      expect(result.poppedProps).toEqual({
        m: 4,
        mt: 2,
        mr: 2,
        mb: 2,
        ml: 2,
        mx: 3,
        my: 3,
      });
      expect(result.otherProps).toEqual({ padding: 4 });
    });

    it('extracts marginStart, marginEnd, marginX, marginY', () => {
      const props = {
        marginStart: '10px',
        marginEnd: '10px',
        marginX: '20px',
        marginY: '15px',
        width: '100%',
      };
      const result = popMarginProps(props);

      expect(result.poppedProps).toEqual({
        marginStart: '10px',
        marginEnd: '10px',
        marginX: '20px',
        marginY: '15px',
      });
      expect(result.otherProps).toEqual({ width: '100%' });
    });

    it('supports additional custom keys', () => {
      const props = {
        margin: '10px',
        customProp: 'value',
        color: 'red',
      };
      const result = popMarginProps(props, ['customProp']);

      expect(result.poppedProps).toEqual({
        margin: '10px',
        customProp: 'value',
      });
      expect(result.otherProps).toEqual({ color: 'red' });
    });

    it('returns empty poppedProps when no margin props exist', () => {
      const props = { color: 'red', size: 'md', variant: 'primary' };
      const result = popMarginProps(props);

      expect(result.poppedProps).toEqual({});
      expect(result.otherProps).toEqual({ color: 'red', size: 'md', variant: 'primary' });
    });
  });

  describe('popFieldWrapperProps()', () => {
    it('extracts all field wrapper props', () => {
      const props = {
        orientation: 'horizontal',
        label: 'Email',
        hint: 'Enter your email',
        error: 'Invalid email',
        disabled: true,
        invalid: true,
        readOnly: false,
        required: true,
        placeholder: 'email@example.com',
        value: 'test@test.com',
      };
      const result = popFieldWrapperProps(props);

      expect(result.poppedProps).toEqual({
        orientation: 'horizontal',
        label: 'Email',
        hint: 'Enter your email',
        error: 'Invalid email',
        disabled: true,
        invalid: true,
        readOnly: false,
        required: true,
      });
      expect(result.otherProps).toEqual({
        placeholder: 'email@example.com',
        value: 'test@test.com',
      });
    });

    it('includes margin props in field wrapper extraction', () => {
      const props = {
        label: 'Name',
        margin: '10px',
        mt: 4,
        value: 'John',
      };
      const result = popFieldWrapperProps(props);

      expect(result.poppedProps).toEqual({
        label: 'Name',
        margin: '10px',
        mt: 4,
      });
      expect(result.otherProps).toEqual({ value: 'John' });
    });

    it('supports additional custom keys', () => {
      const props = {
        label: 'Email',
        customFieldProp: 'value',
        inputType: 'email',
      };
      const result = popFieldWrapperProps(props, ['customFieldProp']);

      expect(result.poppedProps).toEqual({
        label: 'Email',
        customFieldProp: 'value',
      });
      expect(result.otherProps).toEqual({ inputType: 'email' });
    });

    it('returns only otherProps when no field wrapper props exist', () => {
      const props = { value: 'test', onChange: () => {}, name: 'field' };
      const result = popFieldWrapperProps(props);

      expect(result.poppedProps).toEqual({});
      expect(result.otherProps).toEqual({
        value: 'test',
        onChange: expect.any(Function),
        name: 'field',
      });
    });

    it('handles all orientation values', () => {
      const horizontalProps = { orientation: 'horizontal', label: 'Test' };
      const verticalProps = { orientation: 'vertical', label: 'Test' };

      const horizontalResult = popFieldWrapperProps(horizontalProps);
      const verticalResult = popFieldWrapperProps(verticalProps);

      expect(horizontalResult.poppedProps.orientation).toBe('horizontal');
      expect(verticalResult.poppedProps.orientation).toBe('vertical');
    });
  });
});
