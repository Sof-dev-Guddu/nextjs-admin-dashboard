import ReduxAppealHeaderWrapper from '../../components/features/appeal/appeal-header/ReduxAppealHeaderWrapper';
import ReduxAppealTableWrapper from '@/components/features/appeal/appeal-table/ReduxAppealTableWrapper';

import { Appeal } from '@/types/types';
import { getData } from '@/lib/http/services/crudService';
import Endpoints from '@/lib/http/endpoints';

import React from 'react';
import { ReduxAppealNotification } from '@/components/features/appeal/appeal-notification/ReduxAppealNotification';

const AppealLetter = async () => {
  const res = await getData(Endpoints.APPEAL.GET);
  const appeals: Appeal[] = res;

  return (
    <div className=" h-full w-full ">
      <div className=" inline-flex  gap-[0.4rem] items-center border-b-4 border-b-primary pb-1 ml-[0.35rem] text-[0.8rem] flex-shrink-0">
        Appeal Letter
        <ReduxAppealNotification />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden  bg-white rounded-lg h-full w-full ">
        <div className=" h-[10dvh] w-full flex justify-end items-center p-[0.4rem]  ">
          <ReduxAppealHeaderWrapper />
        </div>
        {/* This wrapper makes sticky headers work */}
        <div className="max-h-[62dvh] overflow-hidden mb-[4rem] ">
          <ReduxAppealTableWrapper data={appeals} />
        </div>
        {/* <div className='fixed bottom-0'>
        <DataTablePagination table={Table} />
        </div> */}
      </div>
    </div>
  );
};

export default AppealLetter;
