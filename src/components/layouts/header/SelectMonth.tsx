'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../ui/select';

const SelectMonth = () => {
  const [value, setValue] = useState('');

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[30dvw] bg-white rounded-[5rem] h-11 flex items-center gap-2 px-3 text-sm focus-visible:!border focus-visible:!ring-0 focus-visible:!ring-transparent ">
        {value ? (
          <span className="capitalize">{value}</span>
        ) : (
          <div className="flex items-center gap-2 text-gray-800">
            Select Months
          </div>
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="create">Create New Workspace</SelectItem>
        <SelectItem value="delete">Delete Workspace</SelectItem>
        <SelectItem value="view">View All Workspaces</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMonth;
