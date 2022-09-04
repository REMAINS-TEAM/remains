import {
  UseQuery,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import React, { useCallback, useEffect, useState } from 'react';
import usePrevious from 'hooks/usePrevious';

const LIMIT = 5; //TODO change
const PX_TO_END = 400;

export default function useInfinityScroll<ResultType, ArgsType = any>(
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
  disableLoadByScroll?: boolean,
) {
  const [hookArgs, setHookArgs] = useState<{ limit: number; offset: number }>({
    offset: 0,
    limit: LIMIT,
    ...args,
  });

  const prevArgs = usePrevious(args);
  useEffect(() => {
    if (JSON.stringify(args) !== JSON.stringify(prevArgs)) {
      setHookArgs({ offset: 0, limit: LIMIT, ...args });
    }
  }, [args, prevArgs]);

  const {
    data: prevItems,
    isFetching: isFetchingPrev,
    isSuccess: isSuccessPrev,
    isError: isErrorPrev,
    error: errorPrev,
    isUninitialized: isNotRunPrev,
  } = loadHook(
    {
      ...hookArgs,
      offset: hookArgs.offset - LIMIT,
    },
    { ...loadHookOption, skip: loadHookOption?.skip || hookArgs.offset === 0 },
  );
  const {
    data: curItems,
    isFetching: isFetchingCur,
    isSuccess: isSuccessCur,
    isError: isErrorCur,
    error: errorCur,
    isUninitialized: isNotRunCur,
  } = loadHook(hookArgs, {
    ...loadHookOption,
    skip: loadHookOption?.skip,
  });
  const {
    data: nextItems,
    isFetching: isFetchingNext,
    isSuccess: isSuccessNext,
    isError: isErrorNext,
    error: errorNext,
    isUninitialized: isNotRunNext,
  } = loadHook(
    {
      ...hookArgs,
      offset: hookArgs.offset + LIMIT,
    },
    {
      ...loadHookOption,
      skip: loadHookOption?.skip || disableLoadByScroll,
    },
  );

  // Query response params
  const isFetching = isFetchingPrev || isFetchingCur || isFetchingNext;
  const isSuccess =
    (isNotRunPrev || isSuccessPrev) &&
    (isNotRunCur || isSuccessCur) &&
    (isNotRunNext || isSuccessNext);
  const error = errorPrev || errorCur || errorNext;
  const isError = isErrorPrev || isErrorCur || isErrorNext;

  const [items, setItems] = useState<ResultType[]>([]);

  // Fill result array
  useEffect(() => {
    if (!isSuccess || isFetching) return;

    setItems([
      ...(isNotRunPrev || !prevItems?.list.length ? [] : prevItems?.list || []),
      ...(curItems?.list || []),
      ...(isNotRunNext || !nextItems?.list.length ? [] : nextItems?.list || []),
    ]);
  }, [
    isSuccess,
    prevItems,
    curItems,
    nextItems,
    isNotRunPrev,
    isNotRunNext,
    isFetching,
  ]);

  // When scroll is on up or down change param for query (offset)
  const handleScroll = useCallback(
    (e: React.SyntheticEvent) => {
      const { scrollTop, scrollHeight, offsetHeight } =
        e.target as HTMLDivElement;

      if (!isFetching && items?.length) {
        if (scrollTop <= PX_TO_END && hookArgs.offset !== 0) {
          setHookArgs((prev) => ({
            ...prev,
            offset: prev.offset - LIMIT,
          }));
        }

        if (
          !disableLoadByScroll &&
          scrollTop >= scrollHeight - offsetHeight - PX_TO_END &&
          !nextItems?.isOver
        ) {
          setHookArgs((prev) => ({
            ...prev,
            offset: prev.offset + LIMIT,
          }));
        }
      }
    },
    [disableLoadByScroll, hookArgs, nextItems, isFetching, items],
  );

  return {
    items,
    handleScroll,
    isFetching,
    isFetchingCur,
    isFetchingPrev,
    isFetchingNext,
    isSuccess,
    isSuccessCur,
    isSuccessPrev,
    isSuccessNext,
    error,
    isError,
  };
}
