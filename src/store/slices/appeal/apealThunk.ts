import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';
import {
  addData,
  deleteData,
  getData,
  updateData,
} from '../../../lib/http/services/crudService';
import Endpoints from '../../../lib/http/endpoints';

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

  return response; 
});


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


export const deleteMultipleAppeals = createAsyncThunk<
  string[],           
  string[],           
  { rejectValue: string }
>(
  'appeals/deleteMultiple',
  async (idsToDelete, { rejectWithValue }) => {
    try {
      const deletePromises = idsToDelete.map((id) =>
        deleteData({ url: `${Endpoints.APPEAL.DELETE}/${id}` }) 
          .then(() => id)
      );

      const deletedIds = await Promise.all(deletePromises);
      return deletedIds;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete appeals');
    }
  }
);
