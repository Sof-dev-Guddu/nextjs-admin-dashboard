
import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

export const useTableSorting = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSortingChange = (updater: SortingState | ((prev: SortingState) => SortingState)) => {
    setSorting(prev =>
      typeof updater === 'function' ? (updater as Function)(prev) : updater
    );
  };

  return {
    sorting,
    setSorting: handleSortingChange,
  };
};
