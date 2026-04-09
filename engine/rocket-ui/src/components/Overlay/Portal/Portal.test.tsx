import { axe, render, screen } from '../../../test/test-utils';

import { Portal } from './Portal';

describe('<Portal />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Portal>Portal Content</Portal>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Portal>Portal Content</Portal>);
      expect(screen.getByText('Portal Content')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <Portal>
          <span>First</span>
          <span>Second</span>
        </Portal>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('renders nested elements', () => {
      render(
        <Portal>
          <div>
            <span>Nested Content</span>
          </div>
        </Portal>
      );
      expect(screen.getByText('Nested Content')).toBeInTheDocument();
    });
  });

  describe('portal behavior', () => {
    it('renders content outside of the parent DOM hierarchy', () => {
      render(
        <div data-testid="parent">
          <Portal>
            <span data-testid="portal-content">Content</span>
          </Portal>
        </div>
      );

      // The portal content should not be a direct child of the parent
      const parent = screen.getByTestId('parent');
      const portalContent = screen.getByTestId('portal-content');

      // Portal content exists in the document
      expect(portalContent).toBeInTheDocument();

      // But it's portaled to the body, not inside the parent
      expect(parent.contains(portalContent)).toBe(false);
    });
  });

  describe('conditional rendering', () => {
    it('handles conditional children gracefully', () => {
      const { rerender } = render(<Portal>{true && <span>Conditional Content</span>}</Portal>);
      expect(screen.getByText('Conditional Content')).toBeInTheDocument();

      rerender(<Portal>{false && <span>Conditional Content</span>}</Portal>);
      expect(screen.queryByText('Conditional Content')).not.toBeInTheDocument();
    });
  });
});
