import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlert } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const AppealedBy = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="appealed by" className="text-slate-600">
        {`Appealed by`}
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register('appealedBy')}
          type="text"
          id="appealed by"
          className="h-11 shadow-none focus-visible:border focus-visible:!ring-0 focus-visible:!ring-transparent  focus:border-gray-300"
          placeholder="Appealed by..."
        />
      </div>

      {errors.accountNumber && (
        <div className="text-red-500 flex gap-1 items-center text-sm">
          <CircleAlert />
          <p>The appealed by name is required</p>
        </div>
      )}
    </div>
  );
};

export default AppealedBy;
