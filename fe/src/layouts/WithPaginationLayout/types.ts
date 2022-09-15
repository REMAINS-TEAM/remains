import { MutableRefObject } from 'react';

export interface WithPaginationLayoutProps {
  page: number;
  setPage: (page: number) => void;
  hidden?: boolean;
  count: number;
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>;
}
