import { EventApi } from '@fullcalendar/core';
export function areEventsEqual(a: EventApi[], b: EventApi[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].id !== b[i].id ||
      a[i].title !== b[i].title ||
      a[i].start?.toISOString() !== b[i].start?.toISOString() ||
      a[i].end?.toISOString() !== b[i].end?.toISOString() ||
      a[i].allDay !== b[i].allDay
    ) {
      return false;
    }
  }
  return true;
}
