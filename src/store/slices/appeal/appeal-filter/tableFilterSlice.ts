import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableFilterState {
  globalFilter: string;
}

const initialState: TableFilterState = {
  globalFilter: '',
};

export const tableFilterSlice = createSlice({
  name: 'tableFilter',
  initialState,
  reducers: {
    setGlobalFilter: (state, action: PayloadAction<string>) => {
      state.globalFilter = action.payload;
    },
    resetGlobalFilter: (state) => {
      state.globalFilter = '';
    },
  },
});

export const { setGlobalFilter, resetGlobalFilter } = tableFilterSlice.actions;
export default tableFilterSlice.reducer;
