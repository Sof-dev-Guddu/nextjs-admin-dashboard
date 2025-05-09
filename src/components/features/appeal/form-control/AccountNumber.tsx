import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlert } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const AccountNumber = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="company" className="text-slate-600">
        {`Account Number`}
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register('accountNumber')}
          type="text"
          id="account-number"
          className="h-11 shadow-none focus-visible:border focus-visible:!ring-0 focus-visible:!ring-transparent  focus:border-gray-300"
          placeholder="Account Number..."
        />
      </div>

      {errors.accountNumber && (
        <div className="text-red-500 flex gap-1 items-center text-sm">
          <CircleAlert />
          <p> Account number is required</p>
        </div>
      )}
    </div>
  );
};

export default AccountNumber;
