import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarEvent } from '@/types/types';

interface EventFormDialogProps {
  dialog: ReturnType<typeof import('@/hooks/calendar/useCalendarDialog').useCalendarDialog>;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (event: CalendarEvent) => void;
}

const EventFormDialog: React.FC<EventFormDialogProps> = ({ dialog, addEvent, updateEvent }) => {
  const {
    selectedEvent,
    selectedDate,
    eventFormDialogOpen,
    setEventFormDialogOpen,
  } = dialog;

  const isEditMode = !!selectedEvent;

  const [newEventTitle, setNewEventTitle] = React.useState('');
  const [newEventColor, setNewEventColor] = React.useState('#3b82f6');

  React.useEffect(() => {
    if (isEditMode && selectedEvent) {
      setNewEventTitle(selectedEvent.title);
      setNewEventColor(selectedEvent.backgroundColor || '#3b82f6');
    } else {
      setNewEventTitle('');
      setNewEventColor('#3b82f6');
    }
  }, [isEditMode, selectedEvent]);

 const handleSubmitEvent = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newEventTitle || !newEventColor) return;

  if (isEditMode && selectedEvent) {
  updateEvent({
    id: selectedEvent.id,
    title: newEventTitle,
    start: selectedEvent.start ?? selectedEvent.startStr, // fallback if start is null
    end: selectedEvent.end ?? selectedEvent.endStr,
    backgroundColor: newEventColor,
    allDay: selectedEvent.allDay,
  });
} else if (selectedDate) {
    addEvent({
      title: newEventTitle,
      start: selectedDate.startStr,
      end: selectedDate.endStr,
      backgroundColor: newEventColor,  // ✅ updated here
      allDay: false,
    });
  }

  setEventFormDialogOpen(false);
};


  const handleCloseDialog = () => {
    setEventFormDialogOpen(false);
  };

  return (
    <Dialog open={eventFormDialogOpen} onOpenChange={handleCloseDialog} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Event' : 'Add Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitEvent}>
          <Input
            placeholder="Event title"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            className="mb-4"
          />
          <label>Choose Colour</label>
          <Input
            type="color"
            value={newEventColor}
            onChange={(e) => setNewEventColor(e.target.value)}
            className="mb-4"
          />
          <DialogFooter  >
            <div className="flex flex-col justify-end gap-2 w-full">
 
             <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              {isEditMode ? 'Update' : 'Create'} Event
            </Button>
           </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
