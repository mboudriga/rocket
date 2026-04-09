import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { FileUpload } from './FileUpload';

describe('<FileUpload />', () => {
  it('renders with default props', () => {
    render(<FileUpload label="Upload" />);
    expect(screen.getByText('Drag and drop files here')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<FileUpload label="Upload Files" />);
    expect(screen.getByText('Upload Files')).toBeInTheDocument();
  });

  it('renders dropzone with instructions', () => {
    render(<FileUpload label="Upload" />);
    expect(screen.getByText('Drag and drop files here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse')).toBeInTheDocument();
  });

  describe('file selection', () => {
    it('has hidden file input', () => {
      const { container } = render(<FileUpload label="Upload" />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).toBeInTheDocument();
    });

    it('accepts onChange prop', () => {
      const onChange = vi.fn();
      const { container } = render(<FileUpload label="Upload" onChange={onChange} />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).toBeInTheDocument();
    });

    it('calls onChange when files are selected', async () => {
      const onChange = vi.fn();
      const { container, user } = render(<FileUpload label="Upload" onChange={onChange} />);

      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();

      if (input) {
        const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
        await user.upload(input as HTMLInputElement, file);
        expect(onChange).toHaveBeenCalled();
      }
    });
  });

  describe('file type restrictions', () => {
    it('renders with accept prop for image files', () => {
      const { container } = render(<FileUpload label="Upload" accept="image/*" />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).toHaveAttribute('accept', 'image/*');
    });

    it('renders with accept prop for specific file types', () => {
      const { container } = render(<FileUpload label="Upload" accept=".pdf" />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).toHaveAttribute('accept', '.pdf');
    });

    it('renders without accept attribute when not specified', () => {
      const { container } = render(<FileUpload label="Upload" />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).not.toHaveAttribute('accept');
    });
  });

  describe('multiple files', () => {
    it('allows single file by default', () => {
      const { container } = render(<FileUpload label="Upload" />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).not.toHaveAttribute('multiple');
    });

    it('allows multiple files when maxFiles > 1', () => {
      const { container } = render(<FileUpload label="Upload" maxFiles={5} />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).toHaveAttribute('multiple');
    });

    it('accepts onChange prop with multiple files config', () => {
      const onChange = vi.fn();
      const { container } = render(<FileUpload label="Upload" maxFiles={3} onChange={onChange} />);
      const hiddenInput = container.querySelector('input[type="file"]');
      expect(hiddenInput).toHaveAttribute('multiple');
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<FileUpload label="Upload" disabled />);
      expect(screen.getByText('Drag and drop files here')).toBeInTheDocument();
    });

    it('applies disabled attribute to dropzone', () => {
      const { container } = render(<FileUpload label="Upload" disabled />);
      const dropzone = container.querySelector('[data-part="dropzone"]');
      expect(dropzone).toHaveAttribute('data-disabled');
    });

    it('renders in readOnly state', () => {
      render(<FileUpload label="Upload" readOnly />);
      expect(screen.getByText('Drag and drop files here')).toBeInTheDocument();
    });

    it('renders in invalid state', () => {
      render(<FileUpload label="Upload" invalid />);
      expect(screen.getByText('Drag and drop files here')).toBeInTheDocument();
    });

    it('renders required field', () => {
      render(<FileUpload label="Upload" required />);
      expect(screen.getByText('Upload')).toBeInTheDocument();
    });
  });

  describe('field wrapper integration', () => {
    it('renders with helper text', () => {
      render(<FileUpload label="Upload" hint="Max file size: 5MB" />);
      expect(screen.getByText('Max file size: 5MB')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<FileUpload label="Upload" invalid error="File upload is required" />);
      expect(screen.getByText('File upload is required')).toBeInTheDocument();
    });

    it('renders with horizontal orientation', () => {
      render(<FileUpload label="Upload" orientation="horizontal" />);
      expect(screen.getByText('Upload')).toBeInTheDocument();
    });
  });

  describe('dropzone interaction', () => {
    it('opens file picker when dropzone is clicked', async () => {
      const { container, user } = render(<FileUpload label="Upload" />);

      const dropzone = container.querySelector('[data-part="dropzone"]');
      expect(dropzone).toBeInTheDocument();

      if (dropzone) {
        await user.click(dropzone);
        // The click should trigger the file input
        const hiddenInput = container.querySelector('input[type="file"]');
        expect(hiddenInput).toBeInTheDocument();
      }
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<FileUpload label="Upload Files" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with error state', async () => {
      const { container } = render(
        <FileUpload label="Upload Files" invalid error="Required field" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<FileUpload label="Upload Files" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
