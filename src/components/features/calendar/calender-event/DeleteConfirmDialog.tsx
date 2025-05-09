// // components/calendar/DeleteConfirmDialog.tsx
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// // import { deleteEvent } from '@/features/calendar/calendarThunks';
// // import { closeDeleteDialog } from '@/features/calendar/slice/calendarSlice';

// export default function DeleteConfirmDialog() {
//   const dispatch = useAppDispatch();
//   const { isDeleteDialogOpen, selectedEvent } = useAppSelector((state) => state.calendar.ui);

//   const handleDelete = () => {
//     if (selectedEvent) {
//       dispatch(deleteEvent(selectedEvent.id));
//       dispatch(closeDeleteDialog());
//     }
//   };

//   return (
//     <Dialog open={isDeleteDialogOpen} onOpenChange={() => dispatch(closeDeleteDialog())}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Confirm Delete</DialogTitle>
//         </DialogHeader>
//         <p>Are you sure you want to delete this event?</p>
//         <div className="flex gap-2 mt-4 justify-end">
//           <Button variant="outline" onClick={() => dispatch(closeDeleteDialog())}>Cancel</Button>
//           <Button variant="destructive" onClick={handleDelete}>Delete</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
