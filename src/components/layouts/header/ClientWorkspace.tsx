'use client';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Image from 'next/image';
import { useState } from 'react';

const ClientWorkspace = () => {
  const [value, setValue] = useState('');

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[80px] h-11 flex items-center gap-2 px-3 text-sm border">
        {value ? (
          <span className="capitalize">{value}</span>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <Image
              src="/assets/icons/workspace.png"
              alt="Workspace"
              width={20}
              height={20}
            />
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

export default ClientWorkspace;
