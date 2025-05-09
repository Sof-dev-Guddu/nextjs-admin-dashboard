import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appeal } from '../../../components/features/appeal/data-dialog/columns';
import { fetchAppeals, createAppeal, updateAppeal } from './apealThunk';

interface AppealState {
  appeals: Appeal[];
  loading: boolean;
  error: string | null;
  dialog: {
    isOpen: boolean;
    mode: 'add' | 'edit';
    initialData: Appeal | null;
  };
}

const initialState: AppealState = {
  appeals: [],
  loading: false,
  error: null,
  dialog: {
    isOpen: false,
    mode: 'edit',
    initialData: null,
  },
};

const appealSlice = createSlice({
  name: 'appeals',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{ mode: 'add' | 'edit'; data?: Appeal }>
    ) => {
      state.dialog.isOpen = true;
      state.dialog.mode = action.payload.mode;
      state.dialog.initialData = action.payload.data || null;
    },
    closeDialog: (state) => {
      state.dialog = {
        isOpen: false,
        mode: 'add',
        initialData: null,
      };
    },
    setAppeals: (state, action: PayloadAction<Appeal[]>) => {
      state.appeals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAppeals.fulfilled,
        (state, action: PayloadAction<Appeal[]>) => {
          state.loading = false;
          state.appeals = action.payload; // Now correctly inferred as an array of Appeal
        }
      )
      .addCase(fetchAppeals.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Failed to fetch';
      })
      .addCase(
        createAppeal.fulfilled,
        (state, action: PayloadAction<Appeal>) => {
          state.appeals.unshift(action.payload);
        }
      )
      .addCase(
        updateAppeal.fulfilled,
        (state, action: PayloadAction<Appeal>) => {
          const index = state.appeals.findIndex(
            (a) => a.id === action.payload.id
          );
          if (index !== -1) {
            state.appeals[index] = action.payload;
          }
        }
      );
  },
});

export const { openDialog, closeDialog, setAppeals } = appealSlice.actions;
export default appealSlice.reducer;
