import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  UseQuery,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';

const PX_TO_END = 400;
const LIMIT = 10;

export default function useLazyLoading<ResultType, ArgsType = any>(
  loadHook: UseQuery<
    QueryDefinition<{ limit: number; offset: number }, any, any, ResultType[]>
  >,
  args?: ArgsType,
  loadHookOption?: UseQueryStateOptions<any, any>,
) {
  const isArgsChanged = useRef<boolean>(false);

  const [items, setItems] = useState<ResultType[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    isArgsChanged.current = true;
  }, [args]);

  const { data, isFetching, error, isSuccess } = loadHook(
    {
      limit: LIMIT,
      offset: isArgsChanged.current ? 0 : offset,
      ...args,
    },
    loadHookOption,
  );

  useEffect(() => {
    if (!data) return;

    setItems((prev) => (isArgsChanged.current ? data : [...prev, ...data]));

    isArgsChanged.current = false;
  }, [data]);

  const handleScroll = useCallback(
    (e: React.SyntheticEvent) => {
      const { scrollTop, scrollHeight, offsetHeight } =
        e.target as HTMLDivElement;

      if (scrollTop >= scrollHeight - offsetHeight - PX_TO_END) {
        if (!isFetching && data?.length && data?.length === LIMIT) {
          setOffset(offset + LIMIT);
        }
      }
    },
    [offset, data, isFetching],
  );

  return { handleScroll, items, isFetching, error, isSuccess };
}
