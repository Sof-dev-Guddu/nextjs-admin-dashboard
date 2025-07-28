import { Appeal } from '@/types/types';
import { getData } from '@/lib/http/services/crudService';
import Endpoints from '@/lib/http/endpoints';
import React from 'react';
import dynamic from 'next/dynamic';
import LoadingSkeleton from '@/components/shared/loader/LoadingSkeleton';
import { Suspense } from 'react';
import { columns } from '@/components/features/appeal/table-config/columns/columns';
import AppealStatusNotificationWithRedux from '@/components/wrapped-with-redux/appeal/AppealStatusNotificationWithRedux';
import { Metadata } from 'next';
const AppealHeaderWithRedux = dynamic(() => import('@/components/wrapped-with-redux/appeal/AppealHeaderWithRedux'), {
  suspense: true,
} as any);
const AppealTableWithRedux = dynamic(() => import('@/components/wrapped-with-redux/appeal/AppealTableWithRedux'), {
  suspense: true,
} as any);

//meta data
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Appeal Letter Management | Dashboard',
    description:
      'Manage appeal letters with advanced features like filtering, sorting, pagination, and CRUD in a modern React + Redux dashboard.',
    keywords: ['Next.js 15', 'Appeal Letters', 'CRUD', 'React', 'Redux', 'Filtering', 'Pagination', 'Dashboard'],
    robots: 'index, follow',
    openGraph: {
      title: 'Appeal Letter Dashboard',
      description: 'Manage and track appeal letters efficiently using filters, sorting, and CRUD tools.',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/appeal-letter`, 
      siteName: 'Appeal Dashboard',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Appeal Letter Management Dashboard',
      description: 'Advanced appeal letter management with sorting, filtering, and pagination.',
    },
  };
};

const AppealLetter = async () => {
  const { response, error } = await getData<Appeal[]>(Endpoints.APPEAL.GET);
  const appeals: Appeal[] = response ?? [];
  

  return (
    <main className=" h-full w-full ">
      <div className=" inline-flex  gap-[0.4rem] items-center border-b-4 border-b-primary pb-1 ml-[0.35rem] text-[0.8rem] flex-shrink-0">
        <h1>Appeal Letter</h1>
        <AppealStatusNotificationWithRedux />
      </div>

      <section className="flex-1 flex flex-col overflow-hidden  bg-white rounded-lg h-full w-full ">
        <Suspense fallback={<LoadingSkeleton className="w-full h-[9dvh]" spinerClassName='h-10 w-10' />}>
          <AppealHeaderWithRedux/>
        </Suspense>
        
        <div className="max-h-[62dvh] overflow-hidden mb-[4rem] ">
          <Suspense fallback={<LoadingSkeleton className="w-[98%] ml-2 h-[60dvh]" spinerClassName='h-10 w-10' />}>
            {/* <ReduxAppealTableWrapper data={appeals} error={error} /> */}
            <AppealTableWithRedux data={appeals} error={error} columns={columns} />
          </Suspense>

        </div>
      </section>
    </main>
  );
};

export default AppealLetter;
