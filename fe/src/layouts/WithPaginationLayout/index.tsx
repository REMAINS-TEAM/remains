import React from 'react';
import { Pagination } from '@mui/material';
import { WithPaginationLayoutProps } from './types';

const WithPaginationLayout: React.FC<WithPaginationLayoutProps> = ({
  children,
  page,
  setPage,
  count,
  scrollContainerRef,
  hidden,
}) => {
  const onChangePageHandler = (
    e: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(pageNumber);
  };

  return (
    <>
      {children}
      {!hidden && (
        <Pagination
          size="large"
          sx={{
            pt: 2,
            pb: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          color="primary"
          count={count}
          page={page}
          onChange={onChangePageHandler}
        />
      )}
    </>
  );
};

export default WithPaginationLayout;
