import React from 'react';
import Spinner from 'components/Spinner';
import { Typography } from '@mui/material';
import ReactInfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteScrollProps } from './types';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

export default function InfiniteScroll<T>({
  children,
  endText,
  loadHook,
  hookArgs,
  hasMore,
}: InfiniteScrollProps<T>) {
  const { items, loadMore, loadHookResult } = useInfiniteScroll<T>(
    loadHook,
    hookArgs,
  );

  return (
    <ReactInfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={!!hasMore}
      // hasMore={!!hasMore && loadHookResult.data?.isOver}
      scrollableTarget="main-layout"
      loader={<Spinner sx={{ height: 30 }} />}
      endMessage={
        items.length ? (
          <Typography variant="subtitle2" color="secondary" textAlign="center">
            {endText || 'Вы просмотрели всё'}
          </Typography>
        ) : undefined
      }
    >
      {typeof children === 'function'
        ? children({ loadHookResult, items })
        : children}
    </ReactInfiniteScroll>
  );
}
