// features/calendar/thunks/calendarThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addData,
  getData,
  updateData,
  deleteData,
} from '@/lib/http/services/crudService';
import Endpoints from '@/lib/http/endpoints';
import { CalendarEvent } from '@/types/types';
import { getRandomColor } from '@/utils/colorUtils';

// Helper to generate random color
// const getRandomColor = () => {
//   const colors = [
//     '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
//     '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// Fetch all events
export const fetchEvents = createAsyncThunk<
  CalendarEvent[],
  void,
  { rejectValue: string }
>('calendar/fetchEvents', async (_, { rejectWithValue }) => {
  try {
    const response = await getData<CalendarEvent[]>(Endpoints.CALENDAR.GET);
    if (Array.isArray(response)) {
      return response;
    } else {
      return rejectWithValue('Response is not an array');
    }
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch events');
  }
});

// Add new event
export const createEvent = createAsyncThunk<
  CalendarEvent,
  Omit<CalendarEvent, 'id' | 'color'>,
  { rejectValue: string }
>('calendar/createEvent', async (event, { rejectWithValue }) => {
  try {
    const serializedEvent = {
      ...event,
      id: Date.now().toString(),
      color: getRandomColor(),
      start:
        event.start instanceof Date ? event.start.toISOString() : event.start,
      end: event.end instanceof Date ? event.end.toISOString() : event.end,
    };
    await addData({
      url: Endpoints.CALENDAR.POST,
      data: serializedEvent,
    });
    return serializedEvent;
  } catch (error: any) {
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
    await updateData({
      url: Endpoints.CALENDAR.PUT,
      data: event,
    });
    return event;
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
