// DataDialog.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Company from '../form-control/Company';
import State, { usStates } from '../form-control/State';
import TaxYear from '../form-control/TaxYear';
import Assessor from '../form-control/Assessor';
import AccountNumber from '../form-control/AccountNumber';
import AppealedDeadline from '../form-control/AppealedDeadline';
import Status from '../form-control/Status';
import AppealedDate from '../form-control/AppealedDate';
import AppealedBy from '../form-control/AppealedBy';
import { RootState, AppDispatch } from '@/store';
import {
  createAppeal,
  updateAppeal,
} from '../../../../store/slices/appeal/apealThunk';
import { closeDialog } from '../../../../store/slices/appeal/appealSlice';
import { nanoid } from '@reduxjs/toolkit';
const AppealSchema = z.object({
  id: z.string().optional(),
  taxYear: z.number().int().nonnegative(),
  company: z.string().min(1),
  state: z.string().refine((val) => usStates.includes(val), {
    message: 'Invalid state',
  }),
  assessor: z.string().min(1),
  accountNumber: z.string().regex(/^[a-zA-Z0-9]+$/),
  appealedDeadline: z.date(),
  status: z.enum(['sent', 'not sent']),
  appealedDate: z.date(),
  appealedBy: z.string().min(1),
});

export type AppealFormData = z.infer<typeof AppealSchema>;

export default function DataDialog() {
  const { isOpen, mode, initialData } = useSelector(
    (state: RootState) => state.reducer.appeals.dialog
  );
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm<AppealFormData>({
    resolver: zodResolver(AppealSchema),
    defaultValues: {
      taxYear: new Date().getFullYear(),
      company: '',
      state: '',
      assessor: '',
      accountNumber: '',
      appealedDeadline: new Date(),
      status: 'not sent',
      appealedDate: new Date(),
      appealedBy: '',
    },
  });

  const { reset, setValue } = methods;
  const [selectedTab, setSelectedTab] = useState<'sent' | 'not sent'>(
    'not sent'
  );

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      const parsedInitialData = {
        ...initialData,
        appealedDeadline: initialData.appealedDeadline
          ? new Date(initialData.appealedDeadline)
          : new Date(),
        appealedDate: initialData.appealedDate
          ? new Date(initialData.appealedDate)
          : new Date(),
      };
      reset(parsedInitialData);
      setSelectedTab(initialData.status);
    } else {
      reset({
        taxYear: new Date().getFullYear(),
        company: '',
        state: '',
        assessor: '',
        accountNumber: '',
        appealedDeadline: new Date(),
        status: 'not sent',
        appealedDate: new Date(),
        appealedBy: '',
      });
      setSelectedTab('not sent');
    }
    return () => {
      console.log('Dialog unmounted');
    };
  }, [initialData, mode, reset]);

  const onSubmit = (data: AppealFormData) => {
    const formData = { ...data, status: selectedTab };

    if (mode === 'add') {
      const newAppeal = {
        ...formData,
        id: nanoid(), // Generate a unique random ID just for dev
      };
      dispatch(createAppeal(newAppeal));
    } else if (mode === 'edit') {
      dispatch(updateAppeal(formData));
    }

    dispatch(closeDialog());
  };

  return (
    <Dialog
      key={mode}
      open={isOpen}
      onOpenChange={() => dispatch(closeDialog())}
    >
      <DialogContent className="w-[65vw] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Appeal' : 'Edit Appeal'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Fill in the form to add a new appeal.'
              : 'Update the selected appeal.'}
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1 w-[60dvw]">
              <div className="grid grid-cols-3 gap-5">
                <Company />
                <State />
                <TaxYear />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <Assessor />
                <AccountNumber />
                <AppealedDeadline />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <Status
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <AppealedDate />
                <AppealedBy />
              </div>
            </div>
            <DialogFooter className="mt-9 mb-4 flex items-center gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => dispatch(closeDialog())}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {mode === 'add' ? 'Add Appeal' : 'Update Appeal'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
