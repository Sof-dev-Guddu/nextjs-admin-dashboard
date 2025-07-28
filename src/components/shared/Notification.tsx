import { cn } from '@/lib/utils';
import React from 'react';
type NotificationProps = {
  count: number;
  className?: string;
  title?:string
};
const Notification = ({ count, className,title }: NotificationProps) => {
  return (
    <p title={title} className={cn(' rounded text-sm text-center', className)}>{count.toString()}</p>
  );
};

export default Notification;
