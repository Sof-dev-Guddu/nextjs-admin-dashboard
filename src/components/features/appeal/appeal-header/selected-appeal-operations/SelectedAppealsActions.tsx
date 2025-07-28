import Alert from '@/components/shared/alert/Alert';
import { DeleteAlertDialog } from '@/components/shared/delete-alert/DeleteAlertDialog';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteMultipleAppeals } from '@/store/slices/appeal/apealThunk';
import { downloadAppealsAsPDF } from '@/utils/pdf-downloader/downloadAppealsAsPDF';
import { Delete, Download, MoreHorizontal } from 'lucide-react'
import React, { useCallback, useState } from 'react'
const ACTIONS = {
  DELETE: 'Delete',
  DOWNLOAD: 'Download',
} as const;
function SelectedAppealsActions() {
   const [openDeleteDialog,setOpenDeleteDialog]=useState<boolean>(false)
   const [openAlertDialog,setOpenAlertDialog]=useState<boolean>(false)
   const dispatch = useAppDispatch()
   const {appeals,selectedAppealsIDs}=useAppSelector((state)=>state.reducer.appeals)
    
   const menuItems = [
    { icon: <Delete />, label: ACTIONS.DELETE },
    { icon: <Download />, label: ACTIONS.DOWNLOAD },
  ];

  const handleAction=useCallback((action:string)=>{
  switch(action){
    case ACTIONS.DELETE:
       if(selectedAppealsIDs.length>0 ){
           setTimeout(()=>
           setOpenDeleteDialog(true) 
            ,50)
        }else{
          setOpenAlertDialog(true)
        }
       
        return;
    case ACTIONS.DOWNLOAD:
         
        const selectedAppeals = appeals.filter((item)=>
            selectedAppealsIDs.includes(item.id))
        // console.log("hii from selectedAppeal",selectedAppeals)
        if(selectedAppealsIDs.length>0 && selectedAppeals.length>0){
          downloadAppealsAsPDF(selectedAppeals)
        }else{
          setOpenAlertDialog(true)
        }
        return;
    default:
        return;        
  }
  },[selectedAppealsIDs, appeals])

 const handleDelete = () => {
     const validAppeals = selectedAppealsIDs.filter((id): id is string => typeof id === 'string');
     dispatch(deleteMultipleAppeals(validAppeals));
   };
 
   const handleDeleteCancel = () => {
     setOpenDeleteDialog(false);
   };
 
   const closeAlert=()=>{
    setOpenAlertDialog(false)
   }

   if (openAlertDialog) {
     return (
       <Alert
         open={openAlertDialog}
         onConfirm={closeAlert}
         onOpenChange={closeAlert}
         confirmText='Ok'
         description='At Least Select One Appeal To Perfom This Operation'
       />
     );
   }

   if (openDeleteDialog) {
     return (
       <DeleteAlertDialog
         open={true}
         onConfirm={handleDelete}
         onOpenChange={handleDeleteCancel}
       />
     );
   }


  return (
    <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 w-9 rotate-90 bg-gray-200 hover:bg-gray-300 active:bg-red-300 active:text-white rounded-[50%] p-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              <span className="sr-only">Open menu</span>

              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
           {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={() => handleAction(item.label)}
            className="flex items-center gap-1 p-[0.65rem]"
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  )
}

export default SelectedAppealsActions