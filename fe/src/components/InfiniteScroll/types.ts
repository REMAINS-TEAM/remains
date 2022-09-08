import { ReactNode } from 'react';
import { LoadHook } from 'hooks/useInfinityScroll';

interface ChildrenFunctionArgs<T> {
  items: T[];
  loadHookResult: any;
}

export interface InfiniteScrollProps<T> {
  children: ((args: ChildrenFunctionArgs<T>) => ReactNode) | ReactNode;
  showEndText?: boolean;
  endText?: string;
  loadHook: LoadHook<T>;
  hookArgs?: Record<string, any>;
  hasMore?: boolean;
  emptyStateComponent?: JSX.Element;
}
