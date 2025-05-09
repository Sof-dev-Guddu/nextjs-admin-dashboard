// // components/calendar/EventDialog.tsx
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { closeAddEditDialog } from '@/store/slices/calendar/calendarSlice';
// import { createEvent, editEvent } from '@/store/slices/calendar/calendarThunks';
// import { useState, useEffect } from 'react';

// const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'];

// export default function EventDialog() {
//   const dispatch = useAppDispatch();
//   const { isEventDialogOpen, selectedEvent } = useAppSelector((state) => state.reducer.calendar.ui);

//   const [title, setTitle] = useState('');
//   const [color, setColor] = useState<string>("#FF6384"); // Default color

// const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setColor(event.target.value);
// };

//   useEffect(() => {
//     if (selectedEvent) {
//       setTitle(selectedEvent.title);
//       setColor(selectedEvent.color || colors[0]);
//     } else {
//       setTitle('');
//       setColor(colors[0]);
//     }
//   }, [selectedEvent]);

//   const handleSubmit = () => {
//     if (!title.trim()) return;

//     const payload = {
//       ...selectedEvent,
//       title,
//       color,
//     };

//     if (selectedEvent) {
//       dispatch(editEvent(payload));
//     } else {
//       dispatch(createEvent({ title, color, start: new Date(), end: new Date() }));
//     }

//     dispatch(closeAddEditDialog());
//   };

//   return (
//     <Dialog open={isEventDialogOpen} onOpenChange={() => dispatch(closeAddEditDialog())}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
//         </DialogHeader>
//         <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" />
//         <input
//           type="color"
//               value={color}
//           onChange={handleColorChange}
//             className="w-12 h-12"
//            />
//         <div className="flex flex-wrap gap-2 mt-4">
//           {colors.map((bg) => (
//             <div
//               key={bg}
//               className={`w-6 h-6 rounded-full cursor-pointer border-2 ${color === bg ? 'border-black' : ''}`}
//               style={{ backgroundColor: bg }}
//               onClick={() => setColor(bg)}
//             />
//           ))}
//         </div>
//         <Button onClick={handleSubmit}>{selectedEvent ? 'Update' : 'Create'}</Button>
//       </DialogContent>
//     </Dialog>
//   );
// }
