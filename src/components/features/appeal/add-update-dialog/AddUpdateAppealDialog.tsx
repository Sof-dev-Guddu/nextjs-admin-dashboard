'use client';
import {  FormProvider } from 'react-hook-form';
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
import Company from '../form-controls/Company';
import State from '../form-controls/State';
import TaxYear from '../form-controls/TaxYear';
import Assessor from '../form-controls/Assessor';
import AccountNumber from '../form-controls/AccountNumber';
import AppealedDeadline from '../form-controls/AppealedDeadline';
import Status from '../form-controls/Status';
import AppealedDate from '../form-controls/AppealedDate';
import AppealedBy from '../form-controls/AppealedBy';
import { RootState, AppDispatch } from '@/store';
import { closeDialog } from '../../../../store/slices/appeal/appealSlice';
import useAppealDialogHandler from '@/hooks/appeal/appeal-dialog/useAppealDialogHandler';
import { Loader2 } from 'lucide-react';


export default function AddUpdateAppealDialog() {
  const {loading,dialog}= useSelector(
    (state: RootState) => state.reducer.appeals
  ); 
  console.log("from data dialog component",loading)
  const { isOpen, mode, initialData } = dialog

  const dispatch = useDispatch<AppDispatch>();
  const{onSubmit,selectedTab,setSelectedTab,methods}=useAppealDialogHandler({mode,initialData,dispatch})
  
  return (
    <Dialog
      key={mode}
      open={isOpen}
      onOpenChange={() => dispatch(closeDialog(mode))}
    >
      <DialogContent className={`w-[65vw] ${mode==="change_status" && "w-[30vw]"} max-w-[90vw]`}>
        <DialogHeader>
          <DialogTitle>
            { mode === 'add' && 'Add Appeal' }
            { mode === 'edit' && 'Edit Appeal' }
            { mode === "change_status" && "Change Status" }
          </DialogTitle>
          <DialogDescription>
             { mode === 'add' && 'Fill in the form to add a new appeal.' }
            { mode === 'edit' && 'Update the selected appeal.' }
            { mode === "change_status" && "Update The Status." }
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {mode!=="change_status" && 
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
            }
            {mode==="change_status" && 
            <div>
              <Status
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
            </div>
            }
           
            <DialogFooter className="mt-9 mb-4 flex items-center gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => dispatch(closeDialog(mode))}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                aria-disabled={loading}
              >
                 {!loading && 
                <span>
                  {mode === 'add' && 'Add Appeal'}
                  {mode === 'edit' && 'Update Appeal'}
                  {mode === "change_status" && 'Update Status'}
                </span>
                }

                {loading &&
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>
                  {mode === 'add' && 'Adding...'}
                  {mode === 'edit' && 'Updating...'}
                  {mode === "change_status" && 'Updating...'}
                </span>
                </> 
                }
               
              </Button>

            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
