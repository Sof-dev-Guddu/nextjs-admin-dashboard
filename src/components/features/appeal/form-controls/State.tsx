'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CircleAlert } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

export const usStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const State = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="state" className="text-slate-600">
        State
      </Label>
      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="h-11 shadow-none focus-visible:border focus-visible:!ring-0 focus-visible:!ring-transparent focus:border-gray-300">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {usStates.map((state) => (
                <SelectItem
                  key={state}
                  value={state}
                  className="hover:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:text-black cursor-pointer"
                >
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.state && (
        <div className="text-red-500 flex gap-1 items-center text-sm">
          <CircleAlert className="w-4 h-4" />
          <p>The State Name is required</p>
        </div>
      )}
    </div>
  );
};

export default State;
