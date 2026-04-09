import { createRef } from 'react';
import { FiCheck, FiStar } from 'react-icons/fi';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Tag } from './Tag';

describe('<Tag />', () => {
  it('renders with default props', () => {
    render(<Tag>Default Tag</Tag>);
    expect(screen.getByText('Default Tag')).toBeInTheDocument();
  });

  describe('sizes', () => {
    it('renders with sm size', () => {
      render(<Tag size="sm">SM Tag</Tag>);
      expect(screen.getByText('SM Tag')).toBeInTheDocument();
    });

    it('renders with md size (default)', () => {
      render(<Tag size="md">MD Tag</Tag>);
      expect(screen.getByText('MD Tag')).toBeInTheDocument();
    });

    it('renders with lg size', () => {
      render(<Tag size="lg">LG Tag</Tag>);
      expect(screen.getByText('LG Tag')).toBeInTheDocument();
    });

    it('renders with xl size', () => {
      render(<Tag size="xl">XL Tag</Tag>);
      expect(screen.getByText('XL Tag')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders with subtle variant', () => {
      render(<Tag variant="subtle">Subtle Tag</Tag>);
      expect(screen.getByText('Subtle Tag')).toBeInTheDocument();
    });

    it('renders with solid variant', () => {
      render(<Tag variant="solid">Solid Tag</Tag>);
      expect(screen.getByText('Solid Tag')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Tag variant="outline">Outline Tag</Tag>);
      expect(screen.getByText('Outline Tag')).toBeInTheDocument();
    });

    it('renders with surface variant (default)', () => {
      render(<Tag variant="surface">Surface Tag</Tag>);
      expect(screen.getByText('Surface Tag')).toBeInTheDocument();
    });
  });

  describe('colorPalette', () => {
    it('renders with blue colorPalette (default)', () => {
      render(<Tag colorPalette="blue">Blue Tag</Tag>);
      expect(screen.getByText('Blue Tag')).toBeInTheDocument();
    });

    it('renders with red colorPalette', () => {
      render(<Tag colorPalette="red">Red Tag</Tag>);
      expect(screen.getByText('Red Tag')).toBeInTheDocument();
    });

    it('renders with green colorPalette', () => {
      render(<Tag colorPalette="green">Green Tag</Tag>);
      expect(screen.getByText('Green Tag')).toBeInTheDocument();
    });

    it('renders with gray colorPalette', () => {
      render(<Tag colorPalette="gray">Gray Tag</Tag>);
      expect(screen.getByText('Gray Tag')).toBeInTheDocument();
    });
  });

  describe('combined props', () => {
    it('renders with size, variant and colorPalette combination', () => {
      render(
        <Tag size="lg" variant="solid" colorPalette="red">
          Large Solid Red
        </Tag>
      );
      expect(screen.getByText('Large Solid Red')).toBeInTheDocument();
    });

    it('renders with xl size and outline variant', () => {
      render(
        <Tag size="xl" variant="outline">
          XL Outline
        </Tag>
      );
      expect(screen.getByText('XL Outline')).toBeInTheDocument();
    });

    it('renders with sm size and subtle variant', () => {
      render(
        <Tag size="sm" variant="subtle">
          SM Subtle
        </Tag>
      );
      expect(screen.getByText('SM Subtle')).toBeInTheDocument();
    });
  });

  describe('icons', () => {
    it('renders with left icon', () => {
      render(<Tag leftIcon={<FiStar data-testid="left-icon" />}>With Left Icon</Tag>);
      expect(screen.getByText('With Left Icon')).toBeInTheDocument();
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<Tag rightIcon={<FiCheck data-testid="right-icon" />}>With Right Icon</Tag>);
      expect(screen.getByText('With Right Icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders with both left and right icons', () => {
      render(
        <Tag
          leftIcon={<FiStar data-testid="left-icon" />}
          rightIcon={<FiCheck data-testid="right-icon" />}
        >
          Both Icons
        </Tag>
      );
      expect(screen.getByText('Both Icons')).toBeInTheDocument();
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders without icons by default', () => {
      const { container } = render(<Tag>No Icons</Tag>);
      expect(screen.getByText('No Icons')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="left-icon"]')).not.toBeInTheDocument();
      expect(container.querySelector('[data-testid="right-icon"]')).not.toBeInTheDocument();
    });
  });

  describe('closable behavior', () => {
    it('renders close button when onClose is provided', () => {
      const onClose = vi.fn();
      render(<Tag onClose={onClose}>Closable Tag</Tag>);

      expect(screen.getByText('Closable Tag')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('does not render close button when onClose is not provided', () => {
      render(<Tag>Non-Closable Tag</Tag>);

      expect(screen.getByText('Non-Closable Tag')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      const { user } = render(<Tag onClose={onClose}>Closable Tag</Tag>);

      await user.click(screen.getByRole('button'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders closable tag with icons', async () => {
      const onClose = vi.fn();
      const { user } = render(
        <Tag leftIcon={<FiStar data-testid="left-icon" />} onClose={onClose}>
          Closable With Icon
        </Tag>
      );

      expect(screen.getByText('Closable With Icon')).toBeInTheDocument();
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();

      await user.click(screen.getByRole('button'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Tag>Accessible Tag</Tag>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with outline variant', async () => {
      const { container } = render(<Tag variant="outline">Outline Tag</Tag>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Tag ref={ref}>Tag</Tag>);
      // Note: ChakraTag.Root actually renders a div
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Tag className="custom-class" data-testid="test">
          Tag
        </Tag>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
