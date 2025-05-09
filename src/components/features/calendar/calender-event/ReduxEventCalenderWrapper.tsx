import ReduxProviderWrapper from '@/store/providers/ReduxProviderWrapper';
import React from 'react';
import EventCalendar from './EventCalendar';

const ReduxEventCalenderWrapper = () => {
  return (
    <ReduxProviderWrapper>
      <EventCalendar />
    </ReduxProviderWrapper>
  );
};

export default ReduxEventCalenderWrapper;
