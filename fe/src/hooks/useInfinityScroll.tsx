import {
  UseQuery,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import React, { useCallback, useMemo, useState } from 'react';

const LIMIT = 10;
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
  const [offset, setOffset] = useState(0);

  const {
    data: prevItems,
    isFetching: isFetchingPrev,
    isSuccess: isSuccessPrev,
    isError: isErrorPrev,
    error: errorPrev,
    isUninitialized: isNotRunPrev,
  } = loadHook(
    {
      limit: LIMIT,
      offset: Math.max(0, offset - LIMIT),
      ...args,
    },
    { ...loadHookOption, skip: loadHookOption?.skip },
  );
  const {
    data: curItems,
    isFetching: isFetchingCur,
    isSuccess: isSuccessCur,
    isError: isErrorCur,
    error: errorCur,
    isUninitialized: isNotRunCur,
  } = loadHook(
    {
      limit: LIMIT,
      offset,
      ...args,
    },
    {
      ...loadHookOption,
      skip: loadHookOption?.skip,
    },
  );
  const {
    data: nextItems,
    isFetching: isFetchingNext,
    isSuccess: isSuccessNext,
    isError: isErrorNext,
    error: errorNext,
    isUninitialized: isNotRunNext,
  } = loadHook(
    {
      limit: LIMIT,
      offset: offset + LIMIT,
      ...args,
    },
    {
      ...loadHookOption,
      skip: loadHookOption?.skip || disableLoadByScroll,
    },
  );

  const isFetching = isFetchingPrev || isFetchingCur || isFetchingNext;
  const isSuccess =
    (isNotRunPrev || isSuccessPrev) &&
    (isNotRunCur || isSuccessCur) &&
    (isNotRunNext || isSuccessNext);
  const error = errorPrev || errorCur || errorNext;
  const isError = isErrorPrev || isErrorCur || isErrorNext;

  const items = useMemo(() => {
    const arr = new Array(LIMIT * (offset + 1));
    for (const data of [prevItems, curItems, nextItems]) {
      if (data) {
        arr.splice(data.offset, data.list.length, ...data.list);
      }
    }
    return arr.filter((item) => item.id);
  }, [offset, prevItems, curItems, nextItems]);

  const handleScroll = useCallback(
    (e: React.SyntheticEvent) => {
      const { scrollTop, scrollHeight, offsetHeight } =
        e.target as HTMLDivElement;

      if (!isFetching && items?.length) {
        if (scrollTop <= PX_TO_END && offset !== 0) {
          setOffset(offset - LIMIT);
        }

        if (
          !disableLoadByScroll &&
          scrollTop >= scrollHeight - offsetHeight - PX_TO_END &&
          !nextItems?.isOver
        ) {
          setOffset(offset + LIMIT);
        }
      }
    },
    [disableLoadByScroll, offset, items, nextItems, isFetching],
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
