import React, { MutableRefObject, useState } from 'react';
import ItemCards from 'pages/Categories/units/ItemCards';
import { Box, Typography } from '@mui/material';
import WithPaginationLayout from 'layouts/WithPaginationLayout';
import { ITEMS_PER_PAGE } from 'global/constants';
import itemsApi from 'store/api/items';
import { ErrorOutline } from '@mui/icons-material';

const CompanyItems = ({
  companyId,
  layoutRef,
}: {
  companyId?: number;
  layoutRef?: MutableRefObject<HTMLDivElement | null>;
}) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = itemsApi.useGetItemsQuery(
    {
      limit: ITEMS_PER_PAGE,
      offset: (page - 1) * ITEMS_PER_PAGE,
      companyId,
    },
    { skip: !companyId },
  );

  if (!companyId) return null;

  const pagesCount = Math.ceil((data?.amount || 0) / ITEMS_PER_PAGE);

  const isHiddenPagination =
    isFetching || !data || data.amount <= ITEMS_PER_PAGE;

  return (
    <WithPaginationLayout
      page={page}
      setPage={setPage}
      count={pagesCount}
      hidden={isHiddenPagination}
      scrollContainerRef={layoutRef}
    >
      <ItemCards
        items={data?.list}
        isFetching={isFetching}
        emptyState={
          <Box display="flex" columnGap={2} p={2}>
            <ErrorOutline color="secondary" />
            <Box>
              <Typography color="secondary">
                Компания пока ничего не выкладывала..
              </Typography>
              <Typography color="secondary">
                Следите за обновлениями.
              </Typography>
            </Box>
          </Box>
        }
      />
    </WithPaginationLayout>
  );
};

export default CompanyItems;
