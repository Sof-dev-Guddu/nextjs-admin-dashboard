import React from 'react';
import { Input } from '../ui/input'; 
import { Search } from 'lucide-react'; 

type CustomInputProps = {
  icon?: React.ReactNode; 
  iconClassName?: string; 
  placeholder?: string; 
  value?: string; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  className?: string; 
};

const CustomInput = ({
  icon = <Search />, // Default icon
  iconClassName = 'absolute top-[0.4rem] left-[0.6rem] text-gray-500',
  placeholder = 'Search...',
  value,
  onChange,
  className = 'w-[30dvw] pl-[2.4rem] py-2 rounded-none placeholder:text-gray-400 focus-visible:border focus-visible:!ring-0 focus-visible:!ring-transparent focus:border-gray-300',
}: CustomInputProps) => {
  return (
    <div className="w-full relative">
      {/* Input component */}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />

      {/* Icon placed inside input */}
      <div className={iconClassName}>{icon}</div>
    </div>
  );
};

export default CustomInput;
