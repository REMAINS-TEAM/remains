import React from 'react';
import Spinner from 'components/Spinner';
import { Typography } from '@mui/material';
import ReactInfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteScrollProps } from './types';

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  endText,
  length,
  hasMore,
  next,
}) => {
  return (
    <ReactInfiniteScroll
      dataLength={length}
      next={next}
      hasMore={hasMore === undefined || hasMore}
      scrollableTarget="main-layout"
      loader={<Spinner sx={{ height: 30 }} />}
      endMessage={
        length ? (
          <Typography variant="subtitle2" color="secondary" textAlign="center">
            {endText || 'Вы просмотрели всё'}
          </Typography>
        ) : undefined
      }
    >
      {children}
    </ReactInfiniteScroll>
  );
};

export default React.memo(InfiniteScroll);
