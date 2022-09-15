import { ReactNode } from 'react';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
export type LoadHook<ResultType> = UseQuery<
  QueryDefinition<{ limit: number; offset: number }, any, any, any>
>;

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
