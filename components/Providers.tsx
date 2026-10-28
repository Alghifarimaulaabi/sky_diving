'use client';

import React, { ReactNode } from 'react';
import { KitProvider } from '@/context/KitContext';

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <KitProvider>{children}</KitProvider>;
};
