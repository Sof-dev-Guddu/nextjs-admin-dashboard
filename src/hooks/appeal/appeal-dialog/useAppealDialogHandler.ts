
import { AppDispatch, } from "@/store";
import { createAppeal, updateAppeal } from "@/store/slices/appeal/apealThunk";
import { closeDialog } from "@/store/slices/appeal/appealSlice";
import { AppealFormData } from "@/utils/zod/appeal-schema/appealSchema";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Appeal } from"@/components/features/appeal/table-config/columns/columns"
import { useAppealForm } from "@/hooks/react-hook/useAppealForm";


interface useAppealDialogHandlerProps{
mode:"add" | "edit" | "change_status",
initialData: Appeal | null,
dispatch:AppDispatch,

}
export default function useAppealDialogHandler({mode,initialData,dispatch}:useAppealDialogHandlerProps){

  const methods = useAppealForm();
  const { reset, setValue } = methods;
  const [selectedTab, setSelectedTab] = useState<'sent' | 'not sent'>(
    'not sent'
  );

  useEffect(() => {
    if ((mode === 'edit' || mode === 'change_status') && initialData)  {
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
      
    } else if (mode === 'edit'||"change_status") {
      dispatch(updateAppeal(formData));
    }
  }
return {
  onSubmit,
  selectedTab, 
  setSelectedTab,
  methods
}

}