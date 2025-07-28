'use client';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';
import { Appeal } from '@/components/features/appeal/table-config/columns/columns';
type StatusProps = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<'sent' | 'not sent'>>;
};
const Status = ({ selectedTab, setSelectedTab }: StatusProps) => {
  return (
    <div className="mt-6">
      <Label className="text-slate-600">Status</Label>
      <Tabs
        value={selectedTab}
        onValueChange={(value: string) =>
          setSelectedTab(value as Appeal['status'])
        }
        className="mt-1"
      >
        <TabsList className="h-11 px-2">
          <TabsTrigger
            className={`h-8${selectedTab === 'sent' ? 'text-red-500' : ''}`}
            value="sent"
          >
            <Check />
            sent
          </TabsTrigger>
          <TabsTrigger
            className={`h-8${selectedTab === 'not sent' ? 'text-red-500' : ''}`}
            value="not sent"
          >
            <X />
            not sent
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Status;
