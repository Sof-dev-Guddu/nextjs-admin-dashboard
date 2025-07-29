import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appeal } from"../../../components/features/appeal/table-config/columns/columns"
import { fetchAppeals, createAppeal, updateAppeal,deleteAppeal, deleteMultipleAppeals } from './apealThunk';
import { toast } from "sonner"

interface AppealState {
  appeals: Appeal[];
  loading: boolean;
  errors: string | null;
  dialog: {
    isOpen: boolean;
    mode: 'add' | 'edit'| "change_status";
    initialData: Appeal | null;
  };
   selectedAppealsIDs: (string | undefined)[];
}

const initialState: AppealState = {
  appeals: [],
  loading: true,
  errors: null,
  dialog: {
    isOpen: false,
    mode: 'edit',
    initialData: null,
  },
  selectedAppealsIDs: [],
};

const appealSlice = createSlice({
  name: 'appeals',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{ mode: 'add' | 'edit' | "change_status" ; data?: Appeal }>
    ) => {
      state.dialog.isOpen = true;
      state.dialog.mode = action.payload.mode;
      state.dialog.initialData = action.payload.data || null;
    },
    closeDialog: (state,action) => {
      state.dialog = {
        isOpen: false,
        mode: action.payload ?? "add",
        initialData: null,
      };
    },
    setAppeals: (state, action: PayloadAction<Appeal[]>) => {
      state.appeals = action.payload;
      state.loading=false
    },
    setSSRError: (state, action:PayloadAction<string|null>) => {
      state.errors = action.payload;
      state.loading=false
    },
     setSelectedAppeals: (state, action: PayloadAction<string[]>) => {
      state.selectedAppealsIDs = action.payload
      
    },
    clearSelectedAppeals: (state) => {
      state.selectedAppealsIDs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppeals.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(
        fetchAppeals.fulfilled,
        (state, action: PayloadAction<Appeal[]>) => {
          
          state.loading = false;
          state.appeals = action.payload; 
        }
      )
      .addCase(fetchAppeals.rejected, (state, action) => {
        state.loading = false;
        state.errors =
          (action.payload as string) ||
          action.error.message ||
          'Failed to fetch';
      })
      .addCase(createAppeal.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(
        createAppeal.fulfilled,
        (state, action: PayloadAction<Appeal>) => {
          state.appeals.unshift(action.payload);
          state.loading = false;
            state.dialog = {
             isOpen: false,
             mode:  "add",
             initialData: null,
            }
          toast.success("Appeal has been created.")
        }
      )
      .addCase(
        createAppeal.rejected,
        (state, action) => {
           state.loading = false;
           state.dialog = {
             isOpen: false,
             mode:  "add",
             initialData: null,
            }
       
        state.errors =
          (action.payload as string) ||
          action.error.message ||
          'Failed to add';
          toast.error(state.errors)
        }
      )
      .addCase(updateAppeal.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(
        updateAppeal.fulfilled,
        (state, action: PayloadAction<Appeal>) => {
          const index = state.appeals.findIndex(
            (a) => a.id === action.payload.id
          );
          if (index !== -1) {
            
            state.appeals[index] = action.payload;
          }
           state.loading = false;
            state.dialog = {
             isOpen: false,
             mode:  "add",
             initialData: null,
            }
         
          toast.success(`${state.dialog.mode==="change_status" ? "Status":"Appeal"} Updated Successfully ✔`)
        }
      )
      .addCase(updateAppeal.rejected, (state, action) => {
        state.loading = false;
        
        state.dialog = {
             isOpen: false,
             mode:  "add",
             initialData: null,
            }
        state.errors =
          (action.payload as string) ||
          action.error.message ||
          'Failed to fetch';
          toast.error(state.errors)
      })
      .addCase(
        deleteAppeal.fulfilled,
        (state, action: PayloadAction<Appeal>) => {
          state.loading = false;
          const index = state.appeals.findIndex(
            (a) => a.id === action.payload.id
          );
        
         state.appeals=state.appeals.filter((item)=>item.id!==action.payload.id);
          
         
          toast.success(`Appeal Deleted Successfully ✔`)
        }
      )
      .addCase(deleteAppeal.rejected, (state, action) => {
        state.loading = false;
      
        state.errors =
          (action.payload as string) ||
          action.error.message ||
          'Failed to fetch';
          toast.error(state.errors)
      })
      .addCase(deleteMultipleAppeals.fulfilled, (state, action) => {
          state.loading = false;
          state.appeals = state.appeals.filter(
          (appeal) => typeof appeal.id === 'string' && !action.payload.includes(appeal.id)
           );


           // Clear selected items
           state.selectedAppealsIDs = [];

           toast.success(`${action.payload.length} appeals deleted successfully ✔`);
       })
     .addCase(deleteMultipleAppeals.rejected, (state, action) => {
      state.loading = false;
     state.errors = action.payload || 'Failed to delete appeals';
     toast.error(state.errors);
     });

  },
});

export const { 
  openDialog, 
  closeDialog, 
  setAppeals,
  setSSRError,
  setSelectedAppeals,
  clearSelectedAppeals
              } = appealSlice.actions;

export default appealSlice.reducer;
