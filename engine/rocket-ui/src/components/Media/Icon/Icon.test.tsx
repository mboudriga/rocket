import { MdAdd, MdCheck, MdClose } from 'react-icons/md';

import { axe, render, screen } from '../../../test/test-utils';

import { Icon } from './Icon';

describe('<Icon />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Icon asChild aria-label="Add">
          <MdAdd />
        </Icon>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders svg element with asChild', () => {
      render(
        <Icon asChild data-testid="icon">
          <MdAdd />
        </Icon>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders different icons', () => {
      const { rerender } = render(
        <Icon asChild data-testid="icon">
          <MdCheck />
        </Icon>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();

      rerender(
        <Icon asChild data-testid="icon">
          <MdClose />
        </Icon>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('size customization', () => {
    it('renders with custom boxSize', () => {
      render(
        <Icon asChild boxSize="24px" data-testid="icon">
          <MdAdd />
        </Icon>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('color customization', () => {
    it('renders with custom color', () => {
      render(
        <Icon asChild color="red.500" data-testid="icon">
          <MdAdd />
        </Icon>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Icon asChild className="custom-class" data-testid="test">
          <MdAdd />
        </Icon>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
