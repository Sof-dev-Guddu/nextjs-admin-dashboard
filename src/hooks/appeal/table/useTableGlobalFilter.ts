
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setGlobalFilter as setGlobalFilterAction } from '@/store/slices/appeal/appeal-filter/tableFilterSlice';

export const useTableGlobalFilter = () => {
  const dispatch = useAppDispatch();
  const globalFilter = useAppSelector(
    (state) => state.reducer.tableFilter.globalFilter
  );

  const setGlobalFilter = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    dispatch(setGlobalFilterAction(trimmed));
  };

  return {
    globalFilter,
    setGlobalFilter,
  };
};
