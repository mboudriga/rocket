import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Key } from './Key';

describe('<Key />', () => {
  it('renders with default props', () => {
    render(<Key>Ctrl</Key>);
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
  });

  it('renders multiple keys', () => {
    render(
      <>
        <Key>Ctrl</Key>
        <Key>+</Key>
        <Key>V</Key>
      </>
    );
    expect(screen.getByText('Ctrl')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('V')).toBeInTheDocument();
  });

  describe('sizes', () => {
    it('renders with sm size', () => {
      render(<Key size="sm">Esc</Key>);
      expect(screen.getByText('Esc')).toBeInTheDocument();
    });

    it('renders with md size (default)', () => {
      render(<Key size="md">Enter</Key>);
      expect(screen.getByText('Enter')).toBeInTheDocument();
    });

    it('renders with lg size', () => {
      render(<Key size="lg">Space</Key>);
      expect(screen.getByText('Space')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders with raised variant (default)', () => {
      render(<Key variant="raised">Tab</Key>);
      expect(screen.getByText('Tab')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Key variant="outline">Shift</Key>);
      expect(screen.getByText('Shift')).toBeInTheDocument();
    });

    it('renders with subtle variant', () => {
      render(<Key variant="subtle">Alt</Key>);
      expect(screen.getByText('Alt')).toBeInTheDocument();
    });

    it('renders with plain variant', () => {
      render(<Key variant="plain">Del</Key>);
      expect(screen.getByText('Del')).toBeInTheDocument();
    });
  });

  describe('colorPalette', () => {
    it('renders with gray colorPalette (default)', () => {
      render(<Key colorPalette="gray">F1</Key>);
      expect(screen.getByText('F1')).toBeInTheDocument();
    });

    it('renders with blue colorPalette', () => {
      render(<Key colorPalette="blue">F2</Key>);
      expect(screen.getByText('F2')).toBeInTheDocument();
    });

    it('renders with red colorPalette', () => {
      render(<Key colorPalette="red">F3</Key>);
      expect(screen.getByText('F3')).toBeInTheDocument();
    });
  });

  describe('combined props', () => {
    it('renders with size, variant and colorPalette combination', () => {
      render(
        <Key size="lg" variant="outline" colorPalette="blue">
          Enter
        </Key>
      );
      expect(screen.getByText('Enter')).toBeInTheDocument();
    });

    it('renders with sm size and subtle variant', () => {
      render(
        <Key size="sm" variant="subtle">
          Esc
        </Key>
      );
      expect(screen.getByText('Esc')).toBeInTheDocument();
    });
  });

  describe('keyboard shortcuts', () => {
    it('renders common keyboard shortcuts', () => {
      render(
        <>
          <Key>Cmd</Key>
          <Key>+</Key>
          <Key>S</Key>
        </>
      );
      expect(screen.getByText('Cmd')).toBeInTheDocument();
      expect(screen.getByText('+')).toBeInTheDocument();
      expect(screen.getByText('S')).toBeInTheDocument();
    });

    it('renders special key symbols', () => {
      render(<Key>⌘</Key>);
      expect(screen.getByText('⌘')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Key>Ctrl</Key>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with outline variant', async () => {
      const { container } = render(<Key variant="outline">Ctrl</Key>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations for keyboard shortcut', async () => {
      const { container } = render(
        <>
          <Key>Ctrl</Key>
          <Key>+</Key>
          <Key>C</Key>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLElement>();
      render(<Key ref={ref}>K</Key>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('KBD');
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Key className="custom-class" data-testid="test">
          K
        </Key>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
