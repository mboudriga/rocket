import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Table } from './Table';

const defaultColumns = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Role', accessorKey: 'role' },
];

const defaultData = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

describe('<Table />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Table columns={defaultColumns} data={defaultData} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders column headers', () => {
      render(<Table columns={defaultColumns} data={defaultData} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('renders data rows', () => {
      render(<Table columns={defaultColumns} data={defaultData} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('renders correct number of rows', () => {
      render(<Table columns={defaultColumns} data={defaultData} />);
      const rows = screen.getAllByRole('row');
      // +1 for header row
      expect(rows).toHaveLength(defaultData.length + 1);
    });
  });

  describe('caption', () => {
    it('renders with caption', () => {
      render(<Table columns={defaultColumns} data={defaultData} caption="User Table" />);
      expect(screen.getByText('User Table')).toBeInTheDocument();
    });

    it('renders without caption when not provided', () => {
      render(<Table columns={defaultColumns} data={defaultData} />);
      expect(screen.queryByRole('caption')).not.toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders empty table when no data', () => {
      render(<Table columns={defaultColumns} data={[]} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      // Only header row exists
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(1);
    });
  });

  describe('custom cell renderer', () => {
    it('renders with custom cell function', () => {
      const columns = [
        { header: 'Name', accessorKey: 'name' },
        {
          header: 'Status',
          accessorKey: 'status',
          cell: (row: Record<string, unknown>) => (
            <span data-testid="custom-cell">{String(row.status).toUpperCase()}</span>
          ),
        },
      ];
      const data = [{ name: 'John', status: 'active' }];
      render(<Table columns={columns} data={data} />);
      expect(screen.getByTestId('custom-cell')).toBeInTheDocument();
      expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders with size="%s"', (size) => {
      render(<Table columns={defaultColumns} data={defaultData} size={size} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders with striped variant', () => {
      render(<Table columns={defaultColumns} data={defaultData} striped />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders with interactive variant', () => {
      render(<Table columns={defaultColumns} data={defaultData} interactive />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Table columns={defaultColumns} data={defaultData} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLTableElement>();
      render(<Table ref={ref} columns={defaultColumns} data={defaultData} />);
      expect(ref.current).toBeInstanceOf(HTMLTableElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Table
          className="custom-class"
          data-testid="test"
          columns={defaultColumns}
          data={defaultData}
        />
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
