import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EventApi } from '@fullcalendar/core';


interface EventActionDialogProps {
  selectedEvent: EventApi | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const EventActionDialog: React.FC<EventActionDialogProps> = ({
  selectedEvent,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!selectedEvent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        
      <DialogContent>
        <DialogHeader>
         <DialogTitle>Edit Or Delete</DialogTitle>
        <DialogDescription> What would you like to do with "{selectedEvent.title}"?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventActionDialog;
