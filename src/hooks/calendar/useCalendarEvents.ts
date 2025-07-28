import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import {
  fetchEvents,
  createEvent,
  editEvent,
  deleteEvent,
} from '@/store/slices/calendar/calendarThunks';
import { CalendarEvent } from '@/types/types';

export const useCalendarEvents = () => {
  const dispatch = useAppDispatch();
  const { events, status, error } = useAppSelector((state) => state.reducer.calendar);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => dispatch(createEvent(event));
  const updateEvent = (event: CalendarEvent) => dispatch(editEvent(event));
  const removeEvent = (eventId: string) => dispatch(deleteEvent(eventId));

  return { events, status, error, addEvent, updateEvent, removeEvent };
};
