import React, { ReactNode } from 'react';

export interface MainLayoutProps {
  children: ReactNode;
  forAll?: boolean;
  onScroll?: (e: React.SyntheticEvent) => void;
  onTouchMove?: (e: React.SyntheticEvent) => void;
}
