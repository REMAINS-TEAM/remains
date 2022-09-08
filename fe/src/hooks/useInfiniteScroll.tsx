import { useEffect, useState } from 'react';
import {
  UseQuery,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import usePrevious from 'hooks/usePrevious';

const LIMIT = 5;

export default function useInfiniteScroll<
  ResultType extends { id: number | string },
  ArgsType = any,
>(
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

  const prevArgs = usePrevious(args);

  // Clear items and reset offset when args are changed
  useEffect(() => {
    if (JSON.stringify(args) !== JSON.stringify(prevArgs)) {
      setHookArgs({ offset: 0, limit: LIMIT, ...args });
      setItems([]);
    }
  }, [args, prevArgs]);

  useEffect(() => {
    if (
      loadHookResult.isSuccess &&
      !loadHookResult.isFetching &&
      !!loadHookResult.data?.list?.length
    ) {
      setItems((prev) => {
        //prevent double adding
        if (prev.find((item) => item.id === loadHookResult.data.list?.[0]?.id))
          return prev;
        return [...prev, ...loadHookResult.data.list];
      });
    }
  }, [
    loadHookResult.isSuccess,
    loadHookResult.isFetching,
    loadHookResult.data,
  ]);

  const loadMore = () =>
    setHookArgs((prev) => ({ ...prev, offset: prev.offset + LIMIT }));

  return { loadMore, items, loadHookResult };
}
