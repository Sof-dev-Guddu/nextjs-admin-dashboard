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

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // e.g., 2020–2030

const TaxYear = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="taxYear" className="text-slate-600">
        Tax Year
      </Label>
      <Controller
        name="taxYear"
        control={control}
        render={({ field }) => (
          <Select
            value={String(field.value)}
            onValueChange={(val) => field.onChange(Number(val))}
          >
            <SelectTrigger className="h-11 shadow-none focus-visible:border focus-visible:!ring-0 focus-visible:!ring-transparent focus:border-gray-300">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="hover:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:text-black cursor-pointer"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.taxYear && (
        <div className="text-red-500 flex gap-1 items-center text-sm">
          <CircleAlert className="w-4 h-4" />
          <p>{errors.taxYear.message as string}</p>
        </div>
      )}
    </div>
  );
};

export default TaxYear;
