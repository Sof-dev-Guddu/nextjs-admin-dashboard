import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appeal } from '../../../components/features/appeal/data-dialog/columns';
import {
  addData,
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
  try {
    const response = await addData({
      url: Endpoints.APPEAL.POST,
      data: newAppeal,
    });
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to create appeal');
  }
});

// Typing updateAppeal to return an Appeal and rejection value as a string
export const updateAppeal = createAsyncThunk<
  Appeal,
  Appeal,
  { rejectValue: string }
>('appeals/update', async (updatedAppeal, { rejectWithValue }) => {
  try {
    const response = await updateData({
      url: `${Endpoints.APPEAL.PUT}/${updatedAppeal.id}`, // <-- Insert the ID here
      data: updatedAppeal,
    });
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update appeal');
  }
});
