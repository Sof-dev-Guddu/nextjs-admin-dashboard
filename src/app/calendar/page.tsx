import dynamic from 'next/dynamic';
import LoadingSkeleton from '@/components/shared/loader/LoadingSkeleton';
import { Suspense } from 'react';
import { Metadata } from 'next';
const CalendarWithRedux = dynamic(() => import('@/components/wrapped-with-redux/calendar/CalendarWIthRedux'), {
  suspense: true,
}as any);

// meta data
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Event Calendar | Add, Edit, and Manage Events',
    description:
      'Interactive calendar to create, edit, or delete color-coded events. Click on dates, add event titles, pick colors, and manage events efficiently.',
    keywords: ['calendar', 'event management', 'color picker', 'Next.js', 'React', 'FullCalendar', 'CRUD'],
    robots: 'index, follow',
    openGraph: {
      title: 'Event Calendar Dashboard',
      description:
        'Manage your events with an interactive calendar. Click dates to add events, assign colors, and control scheduling with edit/delete options.',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/calendar`,
      siteName: 'My Project Calendar',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Interactive Event Calendar',
      description:
        'Full-featured event calendar with color picking, editing, and deletion. Ideal for scheduling and planning.',
    },
  };
};

const Calendar = () => {
  return (
    <main className="h-full w-full ">
     <h1 className='text-gray-800 ml-1'><span className='border-b-4 border-b-primary pb-1'>Calendar : Add & Manage Events</span></h1>
      <section className="max-h-[80dvh] mt-2 overflow-auto bg-white rounded-lg  "> 
         <Suspense fallback={<LoadingSkeleton className="w-[98%] ml-2 max-h-[80dvh]" spinerClassName='h-10 w-10' />}>
           <CalendarWithRedux/>
         </Suspense>
      </section>
    </main>
  );
};

export default Calendar;
