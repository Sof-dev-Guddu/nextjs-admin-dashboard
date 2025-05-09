import React from 'react';
import DataDialog from './DataDialog';
import ReduxProviderWrapper from '@/store/providers/ReduxProviderWrapper';

const ReduxDialogWrapper = () => {
  return (
    <ReduxProviderWrapper>
      <DataDialog />
    </ReduxProviderWrapper>
  );
};

export default ReduxDialogWrapper;
