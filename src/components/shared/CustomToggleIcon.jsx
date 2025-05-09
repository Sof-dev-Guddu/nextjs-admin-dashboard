import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

const CustomToggleIcon = () => {
  const { state } = useSidebar();
  return (
    <div className="w-full h-full bg-white rounded-[50%] flex justify-center items-center cursor-pointer">
      <ChevronRight
        className={cn(
          'h-4 w-4 transition-transform duration-200 text-primary',
          state === 'expanded' ? 'rotate-180' : 'rotate-0'
        )}
      />
    </div>
  );
};

export default CustomToggleIcon;
