import { axe, render, screen } from '../../../test/test-utils';

import { FieldWrapper } from './FieldWrapper';

describe('<FieldWrapper />', () => {
  it('renders with default props', () => {
    render(<FieldWrapper id="test-field" label="Test Field" />);
    expect(screen.getByText('Test Field')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <FieldWrapper id="test-field">
        <input type="text" placeholder="Test input" />
      </FieldWrapper>
    );
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  describe('label', () => {
    it('renders with label', () => {
      render(<FieldWrapper id="test-field" label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });
  });

  describe('hint text', () => {
    it('renders with hint', () => {
      render(<FieldWrapper id="test-field" hint="Enter your username" />);
      expect(screen.getByText('Enter your username')).toBeInTheDocument();
    });

    it('does not show hint when error is present', () => {
      render(
        <FieldWrapper id="test-field" hint="Enter your username" error="Username is required" />
      );
      expect(screen.queryByText('Enter your username')).not.toBeInTheDocument();
      expect(screen.getByText('Username is required')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('renders with error', () => {
      render(<FieldWrapper id="test-field" error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<FieldWrapper id="test-field" label="Disabled Field" disabled />);
      expect(screen.getByText('Disabled Field')).toBeInTheDocument();
    });

    it('renders in readOnly state', () => {
      render(<FieldWrapper id="test-field" label="ReadOnly Field" readOnly />);
      expect(screen.getByText('ReadOnly Field')).toBeInTheDocument();
    });

    it('renders with required indicator', () => {
      render(<FieldWrapper id="test-field" required label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <FieldWrapper id="test-field" label="Username">
          <input type="text" placeholder="Enter username" />
        </FieldWrapper>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
