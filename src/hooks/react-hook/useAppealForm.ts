import { AppealFormData, AppealSchema } from "@/utils/zod/appeal-schema/appealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export const useAppealForm = () => {
  return useForm<AppealFormData>({
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
};
