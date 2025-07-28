import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EventApi } from '@fullcalendar/core';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  selectedEvent: EventApi | null;
  onClose: () => void;
  removeEvent: (id: string) => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  selectedEvent,
  onClose,
  removeEvent,
}) => {
  if (!selectedEvent) return null;

  const handleDelete = () => {
    removeEvent(selectedEvent.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
            Are you sure you want to delete "{selectedEvent.title}"?
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                 <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
            </DialogFooter>
        
       
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
