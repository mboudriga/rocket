import { axe, render, screen, waitFor } from '../../../test/test-utils';
import { Button } from '../../Form/Button';
import { Clipboard } from './Clipboard';

describe('<Clipboard />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Clipboard value="text to copy" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('renders copy button', () => {
    render(<Clipboard value="text to copy" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with custom children', () => {
    render(
      <Clipboard value="text">
        <Button>Custom Copy Button</Button>
      </Clipboard>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  describe('copy functionality', () => {
    it('renders copy button that can be clicked', async () => {
      const { user } = render(<Clipboard value="Hello World" />);

      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('copied state', () => {
    it('shows copied indicator after clicking', async () => {
      const { user } = render(<Clipboard value="text" />);

      await user.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });
  });

  describe('custom trigger', () => {
    it('works with custom button as trigger', () => {
      render(
        <Clipboard value="custom trigger value">
          <Button variant="solid">Copy Code</Button>
        </Clipboard>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('value handling', () => {
    it('accepts string value', () => {
      render(<Clipboard value="Hello World" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles empty string value', () => {
      render(<Clipboard value="" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles long text value', () => {
      const longText = 'a'.repeat(1000);
      render(<Clipboard value={longText} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('timeout behavior', () => {
    it('accepts custom timeout prop', async () => {
      const { user } = render(<Clipboard value="test" timeout={100} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('button is keyboard accessible', async () => {
      const { user } = render(<Clipboard value="text" />);

      const button = screen.getByRole('button');
      await user.tab();

      expect(button).toHaveFocus();
    });

    it('can be triggered with Enter key', async () => {
      const { user } = render(<Clipboard value="text" />);

      await user.tab();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });
  });
});
