'use client';

import React from 'react';
import { useKit } from '@/context/KitContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useKit();

  return (
    <div
      className={`toast ${toastMessage ? 'show' : ''}`}
      id="toast"
      role="status"
      aria-live="polite"
    >
      {toastMessage}
    </div>
  );
};
