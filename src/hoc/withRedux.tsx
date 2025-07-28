// src/hoc/withRedux.tsx
'use client';

// src/hoc/withRedux.tsx
'use client';

import { Provider } from 'react-redux';
import store from '../store'; // adjust as needed
import React from 'react';

// ✅ T extends React.PropsWithChildren ensures valid JSX usage
export function withRedux<T extends {}>(
  Component: React.ComponentType<T>
): React.FC<T> {
  const WrappedComponent: React.FC<T> = (props) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

  WrappedComponent.displayName = `withRedux(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
