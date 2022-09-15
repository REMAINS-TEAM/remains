import { MutableRefObject } from 'react';

export interface WithPaginationLayoutProps {
  hidden?: boolean;
  count: number;
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>;
  onChangePage?: (page: number) => void;
}
