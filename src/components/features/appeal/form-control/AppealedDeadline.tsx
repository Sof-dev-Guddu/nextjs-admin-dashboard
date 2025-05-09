'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon, CircleAlert } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

const AppealedDeadline = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="appealedDeadline" className="text-slate-600">
        Appealed Deadline
      </Label>

      <Controller
        name="appealedDeadline"
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-slate-800 justify-start text-left h-11 shadow-none focus-visible:border focus-visible:!ring-0 focus-visible:!ring-transparent focus:border-gray-300"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, 'MMMM d, yyyy')
                ) : (
                  <span>Select deadline</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => field.onChange(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {errors.appealedDeadline && (
        <div className="text-red-500 flex gap-1 items-center text-sm">
          <CircleAlert className="w-4 h-4" />
          <p>{errors.appealedDeadline.message as string}</p>
        </div>
      )}
    </div>
  );
};

export default AppealedDeadline;
