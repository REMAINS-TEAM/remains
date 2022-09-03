import {
  UseQuery,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import React, { useCallback, useMemo, useState } from 'react';

const LIMIT = 5;
const PX_TO_END = 400;

export default function useInfinityScroll<ResultType, ArgsType = any>(
  loadHook: UseQuery<
    QueryDefinition<
      { limit: number; offset: number },
      any,
      any,
      { offset: number; list: ResultType[] }
    >
  >,
  args?: ArgsType,
  loadHookOption?: UseQueryStateOptions<any, any>,
) {
  const [offset, setOffset] = useState(0);

  const {
    data: prevItems,
    isFetching: isFetchingPrev,
    isSuccess: isSuccessPrev,
    error: errorPrev,
  } = loadHook(
    {
      limit: LIMIT,
      offset: offset - LIMIT,
      ...args,
    },
    { skip: offset < LIMIT || loadHookOption?.skip },
  );
  const {
    data: curItems,
    isFetching: isFetchingCur,
    isSuccess: isSuccessCur,
    error: errorCur,
  } = loadHook(
    {
      limit: LIMIT,
      offset,
      ...args,
    },
    loadHookOption,
  );
  const {
    data: nextItems,
    isFetching: isFetchingNext,
    isSuccess: isSuccessNext,
    error: errorNext,
  } = loadHook(
    {
      limit: LIMIT,
      offset: offset + LIMIT,
      ...args,
    },
    loadHookOption,
  );

  const isFetching = isFetchingPrev || isFetchingCur || isFetchingNext;
  const isSuccess = isSuccessPrev && isSuccessCur && isSuccessNext;
  const error = errorPrev || errorCur || errorNext;

  const items = useMemo(() => {
    const arr = new Array(LIMIT * (offset + 1));
    for (const data of [prevItems, curItems, nextItems]) {
      if (data) {
        arr.splice(data.offset, data.list.length, ...data.list);
      }
    }
    return arr;
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
          scrollTop >= scrollHeight - offsetHeight - PX_TO_END &&
          nextItems?.list.length !== 0
        ) {
          setOffset(offset + LIMIT);
        }
      }
    },
    [offset, items, nextItems, isFetching],
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
  };
}
