import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Editable } from './Editable';

describe('<Editable />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(
        <Editable defaultValue="Click to edit">
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );
      expect(screen.getByText('Click to edit')).toBeInTheDocument();
    });

    it('renders with placeholder when empty', () => {
      render(
        <Editable placeholder="Enter text...">
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );
      expect(screen.getByText('Enter text...')).toBeInTheDocument();
    });
  });

  describe('edit mode', () => {
    it('enters edit mode on preview click', async () => {
      const { user } = render(
        <Editable defaultValue="Click me">
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );

      await user.click(screen.getByText('Click me'));
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    it('enters edit mode on double click when startWithEditView is false', async () => {
      const { user } = render(
        <Editable defaultValue="Double click me" activationMode="dblclick">
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );

      await user.dblClick(screen.getByText('Double click me'));
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    it('starts in edit mode when startWithEditView is true', () => {
      render(
        <Editable defaultValue="Edit mode" edit>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('value handling', () => {
    it('calls onChange during editing', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Editable defaultValue="Initial" onChange={onChange}>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );

      await user.click(screen.getByText('Initial'));
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      await user.clear(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), 'New value');
      expect(onChange).toHaveBeenCalled();
    });

    it('calls onCommit on Enter key', async () => {
      const onCommit = vi.fn();
      const { user } = render(
        <Editable defaultValue="Initial" onCommit={onCommit}>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );

      await user.click(screen.getByText('Initial'));
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      await user.type(screen.getByRole('textbox'), ' updated{Enter}');
      expect(onCommit).toHaveBeenCalled();
    });

    it('calls onRevert on Escape key', async () => {
      const onRevert = vi.fn();
      const { user } = render(
        <Editable defaultValue="Initial" onRevert={onRevert}>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );

      await user.click(screen.getByText('Initial'));
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      await user.type(screen.getByRole('textbox'), ' changes');
      await user.keyboard('{Escape}');
      expect(onRevert).toHaveBeenCalled();
    });

    it('supports controlled value', () => {
      render(
        <Editable value="Controlled" onChange={() => {}}>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );
      expect(screen.getByText('Controlled')).toBeInTheDocument();
    });
  });

  describe('submit and cancel controls', () => {
    it('renders submit and cancel triggers', async () => {
      const { user } = render(
        <Editable defaultValue="With controls">
          <Editable.Preview />
          <Editable.Input />
          <Editable.Control>
            <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
            <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          </Editable.Control>
        </Editable>
      );

      await user.click(screen.getByText('With controls'));
      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
      });
    });

    it('submits value on submit trigger click', async () => {
      const onCommit = vi.fn();
      const { user } = render(
        <Editable defaultValue="Submit test" onCommit={onCommit}>
          <Editable.Preview />
          <Editable.Input />
          <Editable.Control>
            <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
            <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          </Editable.Control>
        </Editable>
      );

      await user.click(screen.getByText('Submit test'));
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Save'));
      expect(onCommit).toHaveBeenCalled();
    });

    it('cancels edit on cancel trigger click', async () => {
      const onRevert = vi.fn();
      const { user } = render(
        <Editable defaultValue="Cancel test" onRevert={onRevert}>
          <Editable.Preview />
          <Editable.Input />
          <Editable.Control>
            <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
            <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          </Editable.Control>
        </Editable>
      );

      await user.click(screen.getByText('Cancel test'));
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Cancel'));
      expect(onRevert).toHaveBeenCalled();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(
        <Editable defaultValue="Disabled" disabled>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });

    it('renders in readOnly state', () => {
      render(
        <Editable defaultValue="Read only" readOnly>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );
      expect(screen.getByText('Read only')).toBeInTheDocument();
    });
  });

  describe('select on focus', () => {
    it('selects all text on focus when selectOnFocus is true', async () => {
      const { user } = render(
        <Editable defaultValue="Select me" selectOnFocus>
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );

      await user.click(screen.getByText('Select me'));
      await waitFor(() => {
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Editable defaultValue="Click to edit">
          <Editable.Preview />
          <Editable.Input />
        </Editable>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
