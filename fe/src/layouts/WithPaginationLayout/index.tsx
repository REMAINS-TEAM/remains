import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { WithPaginationLayoutProps } from './types';

const WithPaginationLayout: React.FC<WithPaginationLayoutProps> = ({
  children,
  count,
  scrollContainerRef,
  hidden,
  onChangePage,
}) => {
  const [page, setPage] = useState(1);

  const onChangePageHandler = (
    e: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(pageNumber);
  };

  useEffect(() => {
    if (onChangePage) onChangePage(page);
  }, [page]);

  return (
    <>
      {children}
      {!hidden && (
        <Pagination
          sx={{
            mt: 1,
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
