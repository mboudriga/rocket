import { axe, render, screen } from '../../../test/test-utils';

import { Fieldset } from './Fieldset';

describe('<Fieldset />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Fieldset />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Fieldset>
          <div>Child content</div>
        </Fieldset>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });
  });

  describe('legend', () => {
    it('renders with legend', () => {
      render(<Fieldset legend="Contact Information" />);
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });

    it('legend is visible in the group', () => {
      render(
        <Fieldset legend="Personal Details">
          <div>Form fields here</div>
        </Fieldset>
      );
      expect(screen.getByText('Personal Details')).toBeInTheDocument();
      expect(screen.getByText('Form fields here')).toBeInTheDocument();
    });
  });

  describe('helper text', () => {
    it('renders with helper text', () => {
      render(<Fieldset legend="Address" helperText="Please enter your full address" />);
      expect(screen.getByText('Please enter your full address')).toBeInTheDocument();
    });
  });

  describe('error text', () => {
    it('renders with error text', () => {
      render(<Fieldset legend="Contact" errorText="Please fill in required fields" />);
      expect(screen.getByText('Please fill in required fields')).toBeInTheDocument();
    });

    it('errorText hides helperText', () => {
      render(<Fieldset legend="Contact" helperText="Optional hint" errorText="Required field" />);
      expect(screen.getByText('Required field')).toBeInTheDocument();
      expect(screen.queryByText('Optional hint')).not.toBeInTheDocument();
    });

    it('errorText auto-sets invalid', () => {
      render(<Fieldset errorText="Something went wrong" />);
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('data-invalid');
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Fieldset disabled legend="Disabled Group" />);
      expect(screen.getByRole('group')).toHaveAttribute('disabled');
    });

    it('renders in invalid state', () => {
      render(<Fieldset invalid legend="Invalid Group" />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });
  });

  describe('composition', () => {
    it('composes with multiple form elements', () => {
      render(
        <Fieldset legend="User Info" helperText="Enter your details below">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
        </Fieldset>
      );
      expect(screen.getByText('User Info')).toBeInTheDocument();
      expect(screen.getByText('Enter your details below')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });

    it('can nest multiple fieldsets', () => {
      render(
        <Fieldset legend="Main Group">
          <Fieldset legend="Sub Group" />
        </Fieldset>
      );
      expect(screen.getByText('Main Group')).toBeInTheDocument();
      expect(screen.getByText('Sub Group')).toBeInTheDocument();
      expect(screen.getAllByRole('group')).toHaveLength(2);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Fieldset legend="Contact Information">
          <input type="text" placeholder="Name" />
        </Fieldset>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
