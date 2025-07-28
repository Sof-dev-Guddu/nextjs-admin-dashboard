import { z } from 'zod';
import { usStates } from '@/components/features/appeal/form-controls/State';


export const AppealSchema = z.object({
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