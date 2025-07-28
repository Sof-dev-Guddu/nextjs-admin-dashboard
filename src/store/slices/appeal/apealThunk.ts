import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';
import {
  addData,
  deleteData,
  getData,
  updateData,
} from '../../../lib/http/services/crudService';
import Endpoints from '../../../lib/http/endpoints';

// Typing fetchAppeals to return an array of Appeals and the rejection value as a string
export const fetchAppeals = createAsyncThunk<
  Appeal[],
  void,
  { rejectValue: string }
>('appeals/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await getData(Endpoints.APPEAL.GET);
    if (Array.isArray(response)) {
      return response;
    } else {
      return rejectWithValue('Response is not an array');
    }
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch appeals');
  }
});

// Typing createAppeal to return an Appeal and rejection value as a string
export const createAppeal = createAsyncThunk<
  Appeal,
  Appeal,
  { rejectValue: string }
>('appeals/create', async (newAppeal, { rejectWithValue }) => {
  
    const {response,error} = await addData({
      url: Endpoints.APPEAL.POST,
      data: newAppeal,
    });

   if (error || !response) {
    return rejectWithValue(error || 'Failed to create appeal');
  }

    return response;
  
   
  
});

// Typing updateAppeal to return an Appeal and rejection value as a string
export const updateAppeal = createAsyncThunk<
  Appeal,
  Appeal,
  { rejectValue: string }
>('appeals/update', async (updatedAppeal, { rejectWithValue }) => {
  const { response, error } = await updateData<Appeal>({
    url: `${Endpoints.APPEAL.PUT}/${updatedAppeal.id}`,
    data: updatedAppeal,
  });

  if (error || !response) {
    return rejectWithValue(error || 'Failed to update appeal');
  }

  return response; // ✅ Now it's just Appeal, as required
});

//delete appeal thunk
export const deleteAppeal = createAsyncThunk<
  Appeal,
  Appeal,
  { rejectValue: string }
>('appeals/delete', async (deleteAppeal, { rejectWithValue }) => {
  const { response, error } = await deleteData<Appeal>({
    url: `${Endpoints.APPEAL.DELETE}`,
    id:`${deleteAppeal.id}`
  });

  if (error || !response) {
    return rejectWithValue(error || 'Failed to update appeal');
  }

  return response; 
});

// returns array of deleted IDs
export const deleteMultipleAppeals = createAsyncThunk<
  string[],           // returned value: deleted appeal IDs
  string[],           // input: IDs to delete
  { rejectValue: string }
>(
  'appeals/deleteMultiple',
  async (idsToDelete, { rejectWithValue }) => {
    try {
      const deletePromises = idsToDelete.map((id) =>
        deleteData({ url: `${Endpoints.APPEAL.DELETE}/${id}` }) // DELETE /appeals/id
          .then(() => id)
      );

      const deletedIds = await Promise.all(deletePromises);
      return deletedIds;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete appeals');
    }
  }
);
