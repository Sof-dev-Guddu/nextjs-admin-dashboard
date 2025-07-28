
'use client';

import React, { useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventApi } from '@fullcalendar/core';
import { useCalendarEvents } from '@/hooks/calendar/useCalendarEvents';
import { useCalendarDialog } from '@/hooks/calendar/useCalendarDialog';
import EventFormDialog  from './EventFormDialog';
import EventActionDialog  from './EventActionDialog';
import DeleteConfirmationDialog  from './DeleteConfirmationDialog';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';


const CalendarMain = () => {
  const { events, addEvent, updateEvent, removeEvent } = useCalendarEvents();
  const dialog = useCalendarDialog();
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const handleSelect = (selectInfo: DateSelectArg) => {
    dialog.openAddDialog(selectInfo);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    dialog.openEditDeleteDialog(clickInfo.event);
  };
 console.log("from calander main",events)
  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
         headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        selectable
        editable
        selectMirror
        dayMaxEvents
       
        select={handleSelect}
        eventClick={handleEventClick}
         eventsSet={useCallback((evts: EventApi[]) => {
       if (JSON.stringify(currentEvents) !== JSON.stringify(evts)) {
        setCurrentEvents(evts);
        }
         }, [currentEvents])}
         events={events.map((event) => ({
        ...event,
          backgroundColor: event.backgroundColor || event.color, 
          borderColor: event.borderColor || event.color,
          display: 'block',
          classNames: ['custom-event'],
        }))}
      />

      <EventFormDialog
        dialog={dialog}
        addEvent={addEvent}
       updateEvent={updateEvent}
      />

      <EventActionDialog
        selectedEvent={dialog.selectedEvent}
        isOpen={dialog.eventActionDialogOpen}
        onClose={() => dialog.setEventActionDialogOpen(false)}
        onEdit={() => {
          dialog.setEventActionDialogOpen(false);
          dialog.setEventFormDialogOpen(true);
        }}
        onDelete={() => {
          dialog.setEventActionDialogOpen(false);
          dialog.setDeleteDialogOpen(true);
        }}
      />

     <DeleteConfirmationDialog
  isOpen={dialog.deleteDialogOpen}
  selectedEvent={dialog.selectedEvent}
  onClose={() => dialog.setDeleteDialogOpen(false)}
  removeEvent={(id) => {
    removeEvent(id);
    dialog.setDeleteDialogOpen(false);
  }}
/>

    </div>
  );
};

export default CalendarMain;
