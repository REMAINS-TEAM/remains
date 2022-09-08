import React from 'react';
import Spinner from 'components/Spinner';
import { Typography } from '@mui/material';
import ReactInfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteScrollProps } from './types';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import EmptyState from 'components/EmptyState';

export default function InfiniteScroll<T extends { id: number | string }>({
  children,
  endText,
  showEndText,
  loadHook,
  hookArgs,
  hasMore,
  emptyStateComponent,
}: InfiniteScrollProps<T>) {
  const { items, loadMore, loadHookResult } = useInfiniteScroll<T>(
    loadHook,
    hookArgs,
  );

  if (loadHookResult.isFetching && !items.length)
    return <Spinner sx={{ height: 30, mt: 2 }} />;

  if (loadHookResult.isSuccess && !loadHookResult.isFetching && !items.length)
    return emptyStateComponent || <EmptyState text={'Здесь пусто'} />;

  return (
    <ReactInfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={!!hasMore && loadHookResult?.data?.isOver === false}
      scrollableTarget="main-layout"
      loader={<Spinner sx={{ height: 30 }} />}
      endMessage={
        items.length > 4 && showEndText ? (
          <Typography variant="subtitle2" color="secondary" textAlign="center">
            {endText || 'Пока это всё, что есть...'}
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
