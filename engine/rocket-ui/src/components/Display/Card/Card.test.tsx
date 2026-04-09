import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Card } from './Card';

describe('<Card />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Card>
          <p>Paragraph content</p>
          <span>Span content</span>
        </Card>
      );
      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByText('Span content')).toBeInTheDocument();
    });
  });

  describe('title', () => {
    it('renders with title', () => {
      render(<Card title="Card Title">Content</Card>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('renders without title when not provided', () => {
      render(<Card>Content only</Card>);
      expect(screen.queryByText('Card Title')).not.toBeInTheDocument();
    });
  });

  describe('description', () => {
    it('renders with description', () => {
      render(<Card description="Card description">Content</Card>);
      expect(screen.getByText('Card description')).toBeInTheDocument();
    });

    it('renders title and description together', () => {
      render(
        <Card title="Title" description="Description">
          Content
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('buttons', () => {
    it('renders buttons in footer', () => {
      render(
        <Card
          buttons={[
            { children: 'Cancel', variant: 'ghost' },
            { children: 'Save', colorPalette: 'blue' },
          ]}
        >
          Content
        </Card>
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('calls button onClick handler', async () => {
      const onClick = vi.fn();
      render(<Card buttons={[{ children: 'Click Me', onClick }]}>Content</Card>);
      await screen.getByText('Click Me').click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('buttons take precedence over footer', () => {
      render(
        <Card buttons={[{ children: 'Button' }]} footer={<span>Custom footer</span>}>
          Content
        </Card>
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
      expect(screen.queryByText('Custom footer')).not.toBeInTheDocument();
    });
  });

  describe('footer', () => {
    it('renders custom footer', () => {
      render(<Card footer={<span>Custom footer content</span>}>Content</Card>);
      expect(screen.getByText('Custom footer content')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders with elevated variant', () => {
      render(<Card variant="elevated">Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Card variant="outline">Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with subtle variant', () => {
      render(<Card variant="subtle">Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('renders with sm size', () => {
      render(<Card size="sm">Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with md size', () => {
      render(<Card size="md">Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with lg size', () => {
      render(<Card size="lg">Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('composition', () => {
    it('renders with complex children', () => {
      render(
        <Card title="User Profile">
          <div data-testid="profile-section">
            <img src="avatar.png" alt="Avatar" />
            <h3>John Doe</h3>
            <p>Software Developer</p>
          </div>
        </Card>
      );
      expect(screen.getByText('User Profile')).toBeInTheDocument();
      expect(screen.getByTestId('profile-section')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('can be nested', () => {
      render(
        <Card title="Outer Card">
          <Card title="Inner Card">Inner content</Card>
        </Card>
      );
      expect(screen.getByText('Outer Card')).toBeInTheDocument();
      expect(screen.getByText('Inner Card')).toBeInTheDocument();
      expect(screen.getByText('Inner content')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Card title="Accessible Card">Content</Card>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('edge cases', () => {
    it('handles null children gracefully', () => {
      render(<Card>{null}</Card>);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('handles undefined children gracefully', () => {
      render(<Card>{undefined}</Card>);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('handles empty string title', () => {
      render(<Card title="">Content only</Card>);
      expect(screen.getByText('Content only')).toBeInTheDocument();
    });

    it('renders with no header when title and description are empty', () => {
      render(<Card>Body only</Card>);
      expect(screen.getByText('Body only')).toBeInTheDocument();
    });

    it('renders with empty buttons array (no footer)', () => {
      render(<Card buttons={[]}>Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Card</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
