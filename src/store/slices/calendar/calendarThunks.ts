import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addData,
  getData,
  updateData,
  deleteData,
} from '@/lib/http/services/crudService';
import Endpoints from '@/lib/http/endpoints';
import { CalendarEvent } from '@/types/types';

export const fetchEvents = createAsyncThunk<
  CalendarEvent[],
  void,
  { rejectValue: string }
>('calendar/fetchEvents', async (_, { rejectWithValue }) => {
  try {
    const {response,error} = await getData<CalendarEvent[]>(Endpoints.CALENDAR.GET);
    console.log(response)
     if (error || !Array.isArray(response)) {
      return rejectWithValue('Failed to fetch events or invalid data format');
    }
    return response
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch events');
  }
});

// Add new event
export const createEvent = createAsyncThunk<
  CalendarEvent,
  Omit<CalendarEvent, 'id' >,
  { rejectValue: string }
>('calendar/createEvent', async (event, { rejectWithValue }) => {
  try {
    console.log("calender createEvent thunk try block first")
    const serializedEvent = {
  ...event,
  id: Date.now().toString(),
  start: event.start instanceof Date ? event.start.toISOString() : event.start,
  end: event.end instanceof Date ? event.end.toISOString() : event.end,
  backgroundColor: event.backgroundColor, 
  borderColor: event.backgroundColor,
};
    console.log("calender createEvent thunk try block before add data")
    await addData({
      url: Endpoints.CALENDAR.POST,
      data: serializedEvent,
    });
    console.log("calender createEvent thunk try block after add data")
    return serializedEvent;
  } catch (error: any) {
     console.log("calender createEvent thunk catch block before add data",error)
    return rejectWithValue(error.message || 'Failed to create event');
  }
});

// Update existing event
export const editEvent = createAsyncThunk<
  CalendarEvent,
  CalendarEvent,
  { rejectValue: string }
>('calendar/editEvent', async (event, { rejectWithValue }) => {
  try {
    const serializedEvent = {
      ...event,
      start: event.start instanceof Date ? event.start.toISOString() : event.start,
      end: event.end instanceof Date ? event.end.toISOString() : event.end,
    };

    await updateData({
      url: Endpoints.CALENDAR.PUT,
      data: serializedEvent,
    });

    return serializedEvent;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update event');
  }
});

// Delete event
export const deleteEvent = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('calendar/deleteEvent', async (id, { rejectWithValue }) => {
  try {
    await deleteData({
      url: Endpoints.CALENDAR.DELETE,
      id,
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete event');
  }
});
