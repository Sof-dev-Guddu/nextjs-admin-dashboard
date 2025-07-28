import { useState } from 'react';
import { DateSelectArg, EventApi } from '@fullcalendar/core';

export const useCalendarDialog = () => {
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);

  const [eventFormDialogOpen, setEventFormDialogOpen] = useState(false);
  const [eventActionDialogOpen, setEventActionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openAddDialog = (date: DateSelectArg) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setEventFormDialogOpen(true);
  };

  const openEditDeleteDialog = (event: EventApi) => {
    setSelectedEvent(event);
    setEventActionDialogOpen(true);
  };

  const closeAllDialogs = () => {
    setSelectedDate(null);
    setSelectedEvent(null);
    setEventFormDialogOpen(false);
    setEventActionDialogOpen(false);
    setDeleteDialogOpen(false);
  };

  return {
    selectedDate,
    selectedEvent,
    eventFormDialogOpen,
    eventActionDialogOpen,
    deleteDialogOpen,
    openAddDialog,
    openEditDeleteDialog,
    closeAllDialogs,
    setEventFormDialogOpen,
    setEventActionDialogOpen,
    setDeleteDialogOpen,
  };
};
