import { ReactNode } from 'react';

export interface InfiniteScrollProps {
  children: ReactNode;
  endText?: string;
  hasMore?: boolean;
  length: number;
  next: () => void;
}
