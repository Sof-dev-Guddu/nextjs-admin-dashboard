'use client';

import ReduxProviderWrapper from '@/store/providers/ReduxProviderWrapper';
import Notification from '@/components/shared/Notification';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const NotificationWithRedux = () => {
  const dispatch = useAppDispatch;
  const appeals = useAppSelector((state) => state.reducer.appeals.appeals);
  useEffect(() => {
    if (appeals?.length > 1) {
      const count = appeals.filter(
        (appeal: any) => appeal.status === 'not sent'
      ).length;
      count && setCount(count);
    }
  }, [appeals.length, dispatch]);
  const [count, setCount] = useState<number>(0);

  return (
    <Notification
      className="bg-[#F28372] text-white text-[0.6rem] px-[0.6rem] rounded-[0.5rem]"
      count={count}
    />
  );
};

export const ReduxAppealNotification = () => {
  return (
    <ReduxProviderWrapper>
      <NotificationWithRedux />
    </ReduxProviderWrapper>
  );
};

export default ReduxAppealNotification;
