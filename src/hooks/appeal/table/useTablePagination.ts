import { useCallback, useEffect, useRef, useState } from 'react';

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

export const useTablePagination = (
  initial: PaginationType = { pageIndex: 0, pageSize: 8 }
) => {
  const [pagination, setPagination] = useState<PaginationType>(initial);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handlePaginationChange = useCallback(
    (updater: PaginationType | ((old: PaginationType) => PaginationType)) => {
      if (!isMounted.current) return;

      setPagination((prev) =>
        typeof updater === 'function'
          ? (updater as (old: PaginationType) => PaginationType)(prev)
          : updater
      );
    },
    []
  );

  return {
    pagination,
    setPagination: handlePaginationChange,
  };
};
