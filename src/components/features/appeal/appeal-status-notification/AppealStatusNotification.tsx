'use client';
import Notification from '@/components/shared/Notification';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const AppealStatusNotification = () => {
   const [count, setCount] = useState<number>(0);
  const dispatch = useAppDispatch;
  const {appeals} = useAppSelector((state) => state.reducer.appeals);
  useEffect(() => {
    if (appeals?.length > 1) {
      const count = appeals.filter(
        (appeal: any) => appeal.status === 'not sent'
      ).length;
      count && setCount(count);
    }
  }, [appeals, dispatch]);
 

  return (
   <>
    <Notification
      title={"not sent appeals"}
      className="bg-[#F28372] text-white text-[0.6rem] px-[0.6rem] rounded-[0.5rem]"
      count={count}
    />
    <Notification
      title={"sent appeals"}
      className="bg-primary text-white text-[0.6rem] px-[0.6rem] rounded-[0.5rem]"
      count={appeals?.length-count}
    />
   </>
  );
};

export default AppealStatusNotification;
