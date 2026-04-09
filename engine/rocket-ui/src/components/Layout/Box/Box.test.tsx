import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Box } from './Box';

describe('<Box />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Box>Content</Box>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Box>Box Content</Box>);
      expect(screen.getByText('Box Content')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Box ref={ref}>Content</Box>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Box className="custom-class" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('custom-class');
    });

    it('renders as different element with as prop', () => {
      render(<Box as="section">Content</Box>);
      expect(screen.getByText('Content').tagName).toBe('SECTION');
    });

    it('renders as article', () => {
      render(
        <Box as="article" aria-label="Test article">
          Content
        </Box>
      );
      expect(screen.getByRole('article', { name: 'Test article' })).toBeInTheDocument();
    });
  });

  describe('styling props', () => {
    it('applies padding prop', () => {
      render(<Box padding={4}>Content</Box>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies margin prop', () => {
      render(<Box margin={4}>Content</Box>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies semantic color tokens', () => {
      render(
        <Box bg="bg.muted" color="fg">
          Content
        </Box>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies width and height', () => {
      render(
        <Box width="100px" height="100px">
          Content
        </Box>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('responsive props', () => {
    it('applies responsive padding', () => {
      render(<Box padding={{ base: 2, tablet: 4, desktop: 8 }}>Content</Box>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies responsive display', () => {
      render(<Box display={{ base: 'none', tablet: 'block' }}>Content</Box>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies responsive width', () => {
      render(<Box width={{ base: '100%', tablet: '50%', desktop: '25%' }}>Content</Box>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles null children', () => {
      render(<Box>{null}</Box>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(<Box>{undefined}</Box>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('handles multiple children types', () => {
      render(
        <Box>
          <span>Text</span>
          {null}
          <span>More text</span>
          {undefined}
        </Box>
      );
      expect(screen.getByText('Text')).toBeInTheDocument();
      expect(screen.getByText('More text')).toBeInTheDocument();
    });
  });
});
