import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';
import { Button } from '../Button';
import { Input } from '../Input';
import { Form } from './Form';

describe('<Form />', () => {
  it('renders form element', () => {
    const { container } = render(<Form id="test-form" />);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Form id="test-form">
        <Input id="test-input" placeholder="Enter text" />
      </Form>
    );
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  describe('form submission', () => {
    it('calls onSubmit when form is submitted', async () => {
      const onSubmit = vi.fn();
      const { user } = render(
        <Form id="test-form" onSubmit={onSubmit}>
          <Button type="submit">Submit</Button>
        </Form>
      );

      await user.click(screen.getByRole('button', { name: 'Submit' }));
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('submits form on Enter key in input', async () => {
      const onSubmit = vi.fn();
      const { user } = render(
        <Form id="test-form" onSubmit={onSubmit}>
          <Input id="test-input" />
          <Button type="submit">Submit</Button>
        </Form>
      );

      await user.type(screen.getByRole('textbox'), 'test{enter}');
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Form id="test-form">
          <Input id="test-input" label="Name" />
          <Button type="submit">Submit</Button>
        </Form>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
