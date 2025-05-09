import React from 'react';
import ReduxProviderWrapper from '../../../../store/providers/ReduxProviderWrapper';
import AppealTable from './AppealTable';
import {
  Appeal,
  columns,
} from '@/components/features/appeal/data-table/columns';
interface ReduxAppealTableWrapperProps {
  data: Appeal[]; // Define the correct type for `data`
}

const ReduxAppealTableWrapper = ({ data }: ReduxAppealTableWrapperProps) => {
  return (
    <ReduxProviderWrapper>
      <AppealTable data={data} columns={columns} />
    </ReduxProviderWrapper>
  );
};

export default ReduxAppealTableWrapper;
