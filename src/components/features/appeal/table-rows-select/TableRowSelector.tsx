import { Row, Table } from '@tanstack/react-table';
import { Appeal } from '../table-config/columns/columns';
import { Checkbox } from '@/components/ui/checkbox';

interface HandleSelectProps {
  table?: Table<Appeal>;
  row?: Row<Appeal>;
}

function TableRowSelector({ table, row }: HandleSelectProps) {
  if (table) {
    return (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    );
  }

  if (row) {
    return (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    );
  }

  return null;
}

export default TableRowSelector;
