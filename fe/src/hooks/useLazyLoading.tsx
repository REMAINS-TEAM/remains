import React, { useEffect, useState } from 'react';
import {
  UseQuery,
  UseQueryStateOptions,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import usePrevious from 'hooks/usePrevious';

const PX_TO_END = 400;
const LIMIT = 10;

export default function useLazyLoading<ResultType, ArgsType = any>(
  loadHook: UseQuery<
    QueryDefinition<{ limit: number; offset: number }, any, any, ResultType[]>
  >,
  args?: ArgsType,
  loadHookOption?: UseQueryStateOptions<any, any>,
) {
  const prevArgs = usePrevious(args);
  const isSameArgs = JSON.stringify(prevArgs) === JSON.stringify(args);

  const [items, setItems] = useState<ResultType[]>([]);
  const [offset, setOffset] = useState(0);

  const { data, isFetching, error, isSuccess } = loadHook(
    {
      limit: LIMIT,
      offset: !isSameArgs ? 0 : offset,
      ...args,
    },
    loadHookOption,
  );

  useEffect(() => {
    if (!data) return;
    if (!isSameArgs) return setItems(data);

    setItems((prev) => [...prev, ...data]);
  }, [data, isSameArgs]);

  const handleScroll = (e: React.SyntheticEvent) => {
    const { scrollTop, scrollHeight, offsetHeight } =
      e.target as HTMLDivElement;

    if (scrollTop >= scrollHeight - offsetHeight - PX_TO_END) {
      if (!isFetching && data?.length && data?.length === LIMIT) {
        setOffset(offset + LIMIT);
      }
    }
  };

  return { handleScroll, items, isFetching, error, isSuccess };
}
