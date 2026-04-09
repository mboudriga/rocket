import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Heading } from './Heading';

describe('<Heading />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Heading>Page Title</Heading>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Heading>Page Title</Heading>);
      expect(screen.getByRole('heading', { name: 'Page Title' })).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(<Heading>Welcome to the Application</Heading>);
      expect(
        screen.getByRole('heading', { name: 'Welcome to the Application' })
      ).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Heading className="custom-heading">Custom Heading</Heading>);
      expect(screen.getByRole('heading', { name: 'Custom Heading' })).toHaveClass('custom-heading');
    });
  });

  describe('heading levels', () => {
    it('renders as h2 by default', () => {
      render(<Heading>Default Heading</Heading>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it.each([1, 2, 3, 4, 5, 6] as const)('renders as h%s when as="h%s"', (level) => {
      render(<Heading as={`h${level}`}>Level {level}</Heading>);
      expect(screen.getByRole('heading', { level })).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it.each([
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      '6xl',
      '7xl',
    ] as const)('renders with size="%s"', (size) => {
      render(<Heading size={size}>{size} heading</Heading>);
      expect(screen.getByRole('heading', { name: `${size} heading` })).toBeInTheDocument();
    });

    it('defaults to 2xl size', () => {
      render(<Heading>Default Size</Heading>);
      expect(screen.getByRole('heading', { name: 'Default Size' })).toBeInTheDocument();
    });
  });

  describe('highlight feature', () => {
    it('renders heading with highlight', () => {
      render(
        <Heading
          highlight={{
            query: 'Important',
            styles: { fontWeight: 'bold', color: 'red' },
          }}
        >
          Important Announcement
        </Heading>
      );
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByText(/Announcement/)).toBeInTheDocument();
    });

    it('renders without highlight when not provided', () => {
      render(<Heading>Plain Heading</Heading>);
      expect(screen.getByRole('heading', { name: 'Plain Heading' })).toBeInTheDocument();
    });
  });

  describe('heading hierarchy', () => {
    it('maintains proper heading hierarchy', () => {
      render(
        <>
          <Heading as="h1">Main Title</Heading>
          <Heading as="h2">Section Title</Heading>
          <Heading as="h3">Subsection Title</Heading>
        </>
      );

      expect(screen.getByRole('heading', { level: 1, name: 'Main Title' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Section Title' })).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Subsection Title' })
      ).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<Heading ref={ref}>Heading</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Heading className="custom-class" data-testid="test">
          Heading
        </Heading>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
