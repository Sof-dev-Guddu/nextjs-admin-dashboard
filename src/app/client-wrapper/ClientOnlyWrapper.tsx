'use client';

import React from 'react';

export default function ClientOnlyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
