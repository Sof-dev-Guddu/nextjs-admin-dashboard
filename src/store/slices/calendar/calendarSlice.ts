import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarEvent, CalendarState } from '@/types/types';
import {
  fetchEvents,
  createEvent,
  editEvent,
  deleteEvent,
} from '../calendar/calendarThunks';
import { toast } from 'sonner';

const initialState: CalendarState = {
  events: [],
  status: 'idle',
  error: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    setStatus: (state, action: PayloadAction<CalendarState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<CalendarEvent[]>) => {
          state.status = 'succeeded';
          console.log(action.payload)
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.payload)
        state.error = action.payload ?? 'Failed to fetch events';
      })

      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        createEvent.fulfilled,
        (state, action: PayloadAction<CalendarEvent>) => {
          state.status = 'succeeded';
          state.events.push(action.payload);
         
          toast.success("Event has been created.")
        }
      )
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to create event';
        toast.error("Failed to create event.")
       
      })

      // Edit Event
      .addCase(editEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        editEvent.fulfilled,
        (state, action: PayloadAction<CalendarEvent>) => {
          state.status = 'succeeded';
          const index = state.events.findIndex(
            (e) => e.id === action.payload.id
          );
          if (index !== -1) {
            state.events[index] = action.payload;
          }
          toast.success("Event has been updated.")
        }
      )
      .addCase(editEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to update event';
        toast.error('Failed to update event')
      })

      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.events = state.events.filter(
            (event) => event.id !== action.payload
          );
           toast.success('Event deleted succeessfully ')
        }
      )
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = 'failed';
        console.log("from slice calander",action.payload)
        state.error = action.payload ?? 'Failed to delete event';

        toast.error('Failed to delete event')
      });
  },
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  setStatus,
  setError,
} = calendarSlice.actions;

export default calendarSlice.reducer;
