import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
type NotificationProps = {
  count: number;
  className?: string;
};
const Notification = ({ count, className }: NotificationProps) => {
  return (
    <div className={cn(' rounded text-sm text-center', className)}>{count}</div>
  );
};

export default Notification;
