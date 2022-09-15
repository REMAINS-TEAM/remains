import React, { MutableRefObject, ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
  onScroll?: (e: React.SyntheticEvent) => void;
}
