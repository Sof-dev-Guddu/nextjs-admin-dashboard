import CalendarActions from '@/components/features/calendar/CalendarActions';
import CalendarHeader from '@/components/features/calendar/CalendarHeader';
import EventCalendar from '@/components/features/calendar/calender-event/EventCalendar';
import ReduxEventCalenderWrapper from '@/components/features/calendar/calender-event/ReduxEventCalenderWrapper';
import React from 'react';

const Calendar = () => {
  return (
    <div className="h-full w-full bg-white rounded pt-2">
      <CalendarHeader />
      <CalendarActions />
      <div className="max-h-[62dvh] mt-2 overflow-auto">
        <ReduxEventCalenderWrapper />
      </div>
    </div>
  );
};

export default Calendar;
