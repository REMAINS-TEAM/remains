import React, { useEffect, useState } from 'react';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';

const PX_TO_END = 400;
const LIMIT = 10;

export default function useLazyLoading<ResultType>(
  loadHook: UseQuery<
    QueryDefinition<{ limit: number; offset: number }, any, any, ResultType[]>
  >,
) {
  const [items, setItems] = useState<ResultType[]>([]);
  const [offset, setOffset] = useState(0);

  const { data, isFetching } = loadHook({ limit: LIMIT, offset });

  useEffect(() => {
    if (!data) return;
    setItems((prev) => [...prev, ...data]);
  }, [data]);

  const handleScroll = (e: React.SyntheticEvent) => {
    const { scrollTop, scrollHeight, offsetHeight } =
      e.target as HTMLDivElement;
    if (scrollTop >= scrollHeight - offsetHeight - PX_TO_END) {
      if (!isFetching && data?.length && data?.length === LIMIT)
        setOffset(offset + LIMIT);
    }
  };

  return { handleScroll, items, isFetching };
}
