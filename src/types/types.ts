export type Appeal = {
  id: string;
  taxYear: number;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  appealedDeadline: string; // ISO date string
  status: 'sent' | 'not sent'; // use union if known statuses
  appealedDate: string;
  appealedBy: string;
};

// features/calendar/types.ts
export interface CalendarEvent {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  allDay: boolean;
   backgroundColor?: string;
  borderColor?: string;
  color?: string;
}
export interface CalendarUIState {
  isEventDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedEvent: CalendarEvent | null;
}
export interface CalendarState {
  events: CalendarEvent[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // ui: CalendarUIState;
}
