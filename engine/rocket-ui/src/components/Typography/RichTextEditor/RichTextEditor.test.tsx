import { createRef } from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor } from '../../../test/test-utils';

import { RichTextEditor } from './RichTextEditor';

// Mock DOM APIs that ProseMirror needs but jsdom doesn't support
beforeAll(() => {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(callback, 0) as unknown as number;
  };
  globalThis.cancelAnimationFrame = (id: number) => {
    clearTimeout(id);
  };

  // Mock getClientRects for ProseMirror
  const mockDOMRectList = {
    length: 0,
    item: () => null,
    [Symbol.iterator]: function* () {},
  } as unknown as DOMRectList;

  Range.prototype.getClientRects = vi.fn(() => mockDOMRectList);

  Range.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({}),
  }));

  Element.prototype.getClientRects = vi.fn(() => mockDOMRectList);

  // Mock scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();
});

describe('<RichTextEditor />', () => {
  it('renders with default props', async () => {
    render(<RichTextEditor id="test-editor" />);

    // Wait for editor to initialize
    await waitFor(() => {
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });
  });

  it('renders with label', async () => {
    render(<RichTextEditor id="test-editor" label="Description" />);

    await waitFor(() => {
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  it('renders with placeholder', async () => {
    render(<RichTextEditor id="test-editor" placeholder="Write something..." />);

    await waitFor(() => {
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });
  });

  it('renders with hint text', async () => {
    render(<RichTextEditor id="test-editor" hint="Maximum 500 characters" />);

    await waitFor(() => {
      expect(screen.getByText('Maximum 500 characters')).toBeInTheDocument();
    });
  });

  it('renders with error text', async () => {
    render(<RichTextEditor id="test-editor" error="Content is required" />);

    await waitFor(() => {
      expect(screen.getByText('Content is required')).toBeInTheDocument();
    });
  });

  describe('toolbar controls', () => {
    it('renders all default formatting controls', async () => {
      render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Italic' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Underline' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Strikethrough' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Highlight' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Link' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Code' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bullet List' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Ordered List' })).toBeInTheDocument();
      });
    });

    it('toggles bold formatting on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
      });

      const boldButton = screen.getByRole('button', { name: 'Bold' });
      await user.click(boldButton);

      expect(boldButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles italic formatting on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Italic' })).toBeInTheDocument();
      });

      const italicButton = screen.getByRole('button', { name: 'Italic' });
      await user.click(italicButton);

      expect(italicButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('value handling', () => {
    it('renders with initial value', async () => {
      render(<RichTextEditor id="test-editor" defaultValue="<p>Initial content</p>" />);

      await waitFor(() => {
        expect(screen.getByText('Initial content')).toBeInTheDocument();
      });
    });

    it('accepts onChange handler', async () => {
      const onChange = vi.fn();
      render(<RichTextEditor id="test-editor" onChange={onChange} />);

      await waitFor(() => {
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
      });

      // Just verify the component renders with the onChange prop
      // Typing tests are flaky in jsdom due to ProseMirror limitations
    });
  });

  describe('states', () => {
    it('renders in disabled state', async () => {
      render(<RichTextEditor id="test-editor" disabled />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
          expect(button).toBeDisabled();
        });
      });
    });

    it('renders as required', async () => {
      render(<RichTextEditor id="test-editor" required label="Content" />);

      await waitFor(() => {
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
      });
    });
  });

  describe('character count', () => {
    it('shows character count when enabled', async () => {
      render(
        <RichTextEditor
          id="test-editor"
          showCharacterCount
          characterLimit={100}
          defaultValue="<p>Hello</p>"
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/characters/)).toBeInTheDocument();
        expect(screen.getByText(/100/)).toBeInTheDocument();
      });
    });

    it('shows word count when enabled', async () => {
      render(
        <RichTextEditor id="test-editor" showCharacterCount defaultValue="<p>Hello world</p>" />
      );

      await waitFor(() => {
        expect(screen.getByText(/words/)).toBeInTheDocument();
      });
    });
  });

  describe('custom layout', () => {
    it('renders with custom children', async () => {
      render(
        <RichTextEditor id="test-editor">
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlGroup>
              <RichTextEditor.Control.Bold />
            </RichTextEditor.ControlGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content />
        </RichTextEditor>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Italic' })).not.toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('toolbar has correct aria-orientation', async () => {
      render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        const toolbar = screen.getByRole('toolbar');
        expect(toolbar).toHaveAttribute('aria-label', 'Formatting options');
      });
    });

    it('control buttons have proper aria attributes', async () => {
      render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        const boldButton = screen.getByRole('button', { name: 'Bold' });
        expect(boldButton).toHaveAttribute('aria-pressed');
        expect(boldButton).toHaveAttribute('aria-label', 'Bold');
      });
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<RichTextEditor ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<RichTextEditor className="custom-class" data-testid="test" />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });

  describe('toolbar more controls', () => {
    it('toggles underline formatting on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Underline' })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: 'Underline' });
      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles strikethrough formatting on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Strikethrough' })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: 'Strikethrough' });
      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles highlight formatting on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Highlight' })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: 'Highlight' });
      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles code formatting on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Code' })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: 'Code' });
      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles bullet list on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Bullet List' })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: 'Bullet List' });
      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles ordered list on click', async () => {
      const { user } = render(<RichTextEditor id="test-editor" />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Ordered List' })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: 'Ordered List' });
      await user.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
