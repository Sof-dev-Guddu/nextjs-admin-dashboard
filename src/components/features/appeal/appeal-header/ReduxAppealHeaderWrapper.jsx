import React from 'react';
import ReduxProviderWrapper from '../../../../store/providers/ReduxProviderWrapper';
import AppealHeader from './AppealHeader';

const ReduxAppealHeaderWrapper = () => {
  return (
    <ReduxProviderWrapper>
      <AppealHeader />
    </ReduxProviderWrapper>
  );
};

export default ReduxAppealHeaderWrapper;
