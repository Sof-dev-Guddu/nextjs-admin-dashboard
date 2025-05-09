'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchEvents,
  createEvent,
  editEvent,
  deleteEvent,
} from '@/store/slices/calendar/calendarThunks';
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getTextColor } from '@/utils/colorUtils';
import { areEventsEqual } from '@/utils/areEventsEqual';
import { DeleteAlertDialog } from '@/components/shared/delete-alert/DeleteAlertDialog';

const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, status } = useAppSelector((state) => state.reducer.calendar);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    event: EventApi | null;
  }>({
    open: false,
    event: null,
  });

  useEffect(() => {
    dispatch(fetchEvents());
    console.log('calendar', events);
  }, [dispatch]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setDeleteDialog({ open: true, event: clickInfo.event });
  };

  const handleConfirmDelete = async () => {
    if (deleteDialog.event) {
      await dispatch(deleteEvent(deleteDialog.event.id));
      deleteDialog.event.remove();
      setDeleteDialog({ open: false, event: null });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle('');
    setSelectedDate(null);
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const newEvent: Omit<CalendarEvent, 'id' | 'color'> = {
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      await dispatch(createEvent(newEvent));
      handleCloseDialog();
    }
  };

  const handleEventChange = async (changeInfo: { event: EventApi }) => {
    const event = changeInfo.event;

    
    const updatedEvent: CalendarEvent = {
      id: event.id,
      title: event.title,
      start: event.start?.toISOString() || '',
      end: event.end?.toISOString() || '',
      allDay: event.allDay,
      color: event.backgroundColor || '#000066',
    };

    
    await dispatch(editEvent(updatedEvent));
  };

  return (
    <div className="w-[85dvw]">
      <FullCalendar
        height={'200dvh'}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        // events={events.map(event => ({
        //   id: event.id,
        //   title: event.title,
        //   start: event.start,
        //   end: event.end,
        //   allDay: event.allDay,
        //   backgroundColor: event.color,
        //   borderColor: event.color,

        // }))}
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
          backgroundColor: event.color, 
          borderColor: event.color,
          textColor: getTextColor({ bgColor: event.color }), 
          display: 'block',
          classNames: ['custom-event'],
        }))}
        select={handleDateClick}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
        eventsSet={useCallback((events: EventApi[]) => {
          setCurrentEvents((prev) => {
            if (!areEventsEqual(prev, events)) {
              return events;
            }
            return prev;
          });
        }, [])}
      />
      {/* add event dialog in future can reuse with edit with choose bg color picker  */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              {selectedDate &&
                formatDate(selectedDate.start, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEvent}>
            <Input
              placeholder="Event title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="mb-4"
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* delete alert dialog */}
      <DeleteAlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog((prev) => ({
            ...prev,
            open,
            event: open ? prev.event : null,
          }))
        }
        onConfirm={handleConfirmDelete}
        title="Delete this event?"
        description={`Are you sure you want to delete '${deleteDialog.event?.title}'?`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={false}
      />
    </div>
  );
};

export default Calendar;
