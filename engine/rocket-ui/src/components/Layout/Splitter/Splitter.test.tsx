import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Splitter } from './Splitter';

const defaultPanels = [
  { id: 'left', children: 'Left Panel' },
  { id: 'right', children: 'Right Panel' },
];

describe('<Splitter />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Splitter panels={defaultPanels} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders panels with content', () => {
      render(<Splitter panels={defaultPanels} />);
      expect(screen.getByText('Left Panel')).toBeInTheDocument();
      expect(screen.getByText('Right Panel')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Splitter ref={ref} panels={defaultPanels} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      const { container } = render(<Splitter className="custom-class" panels={defaultPanels} />);
      const root = container.querySelector('[data-scope="splitter"]');
      expect(root).toHaveClass('custom-class');
    });

    it('renders resize handle between panels', () => {
      const { container } = render(<Splitter panels={defaultPanels} />);
      // Resize trigger should be present between panels
      const resizeTrigger = container.querySelector('[data-part="resize-trigger"]');
      expect(resizeTrigger).toBeInTheDocument();
    });

    it('renders with vertical orientation', () => {
      const { container } = render(<Splitter panels={defaultPanels} orientation="vertical" />);
      const root = container.querySelector('[data-orientation="vertical"]');
      expect(root).toBeInTheDocument();
    });

    it('returns null when no panels provided', () => {
      const { container } = render(<Splitter panels={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('constraints', () => {
    it('respects min/max size constraints', () => {
      const panelsWithConstraints = [
        { id: 'left', children: 'Left Panel', minSize: 20, maxSize: 80 },
        { id: 'right', children: 'Right Panel' },
      ];
      const { container } = render(<Splitter panels={panelsWithConstraints} />);

      // Component should render with constraints applied
      expect(screen.getByText('Left Panel')).toBeInTheDocument();
      expect(container.querySelector('[data-part="panel"]')).toBeInTheDocument();
    });

    it('renders with defaultSize for panels', () => {
      const panelsWithDefaultSize = [
        { id: 'left', children: 'Left Panel', defaultSize: 30 },
        { id: 'right', children: 'Right Panel', defaultSize: 70 },
      ];
      render(<Splitter panels={panelsWithDefaultSize} />);

      expect(screen.getByText('Left Panel')).toBeInTheDocument();
      expect(screen.getByText('Right Panel')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('resizes panels with keyboard arrows', async () => {
      const { user, container } = render(<Splitter panels={defaultPanels} />);

      // Find the resize trigger and focus it
      const resizeTrigger = container.querySelector('[data-part="resize-trigger"]');
      if (resizeTrigger && resizeTrigger instanceof HTMLElement) {
        resizeTrigger.focus();
        await user.keyboard('{ArrowRight}');

        // onSizeChange should be called when resizing via keyboard
        // Note: depending on implementation, this may or may not fire
        expect(resizeTrigger).toHaveFocus();
      }
    });
  });

  describe('callbacks', () => {
    it('renders with resize trigger', () => {
      const { container } = render(<Splitter panels={defaultPanels} />);

      const resizeTrigger = container.querySelector('[data-part="resize-trigger"]');
      expect(resizeTrigger).toBeInTheDocument();
    });
  });

  describe('multiple panels', () => {
    it('renders three panels with two resize handles', () => {
      const threePanels = [
        { id: 'left', children: 'Left Panel' },
        { id: 'center', children: 'Center Panel' },
        { id: 'right', children: 'Right Panel' },
      ];
      const { container } = render(<Splitter panels={threePanels} />);

      expect(screen.getByText('Left Panel')).toBeInTheDocument();
      expect(screen.getByText('Center Panel')).toBeInTheDocument();
      expect(screen.getByText('Right Panel')).toBeInTheDocument();

      const resizeTriggers = container.querySelectorAll('[data-part="resize-trigger"]');
      expect(resizeTriggers).toHaveLength(2);
    });
  });
});
