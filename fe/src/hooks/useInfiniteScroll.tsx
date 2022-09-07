import React, { useEffect, useState } from 'react';
import {
  UseQuery,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';

const LIMIT = 5;

export default function useInfiniteScroll<ResultType, ArgsType = any>(
  loadHook: UseQuery<
    QueryDefinition<
      { limit: number; offset: number },
      any,
      any,
      { offset: number; list: ResultType[]; isOver: boolean }
    >
  >,
  args?: ArgsType,
  loadHookOption?: UseQueryStateOptions<any, any>,
) {
  const [hookArgs, setHookArgs] = useState<{ limit: number; offset: number }>({
    offset: 0,
    limit: LIMIT,
    ...args,
  });

  const [items, setItems] = useState<ResultType[]>([]);

  const loadHookResult = loadHook(hookArgs, loadHookOption);

  useEffect(() => {
    if (
      loadHookResult.isSuccess &&
      !loadHookResult.isFetching &&
      loadHookResult.data
    ) {
      setItems((prev) => [...prev, ...loadHookResult.data.list]);
    }
  }, [
    loadHookResult.isSuccess,
    loadHookResult.isFetching,
    loadHookResult.data,
  ]);

  const loadMore = () =>
    setHookArgs((prev) => ({ ...prev, offset: prev.offset + LIMIT }));

  return { loadMore, items, loadHookResult, setHookArgs };
}
