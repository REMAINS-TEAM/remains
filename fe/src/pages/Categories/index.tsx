import React, { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import {
  Box,
  Button,
  IconButton,
  SpeedDialIcon as AddIcon,
} from '@mui/material';
import itemsApi, { GetAllItemsArgs, ItemFilters } from 'store/api/items';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import AddEditItemPopup from 'components/Popups/AddEditItemPopup';
import BreadCrumbs from 'components/BreadCrumbs';
import categoriesApi from 'store/api/categories';
import Container from 'components/Container';
import routes from 'routes';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import Header from 'components/Header';
import { ITEMS_PER_PAGE } from 'global/constants';
import WithPaginationLayout from 'layouts/WithPaginationLayout';
import useRouterQuery from 'hooks/useRouterQuery';

function CategoriesPage() {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const { categoryId } = useParams();
  const queryParams = useRouterQuery();

  const [addItemPopupOpen, setAddEditItemPopupOpen] = useState(false);

  const navigate = useNavigate();

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const { data: categories } = categoriesApi.useGetAllQuery({
    parentId: +(categoryId || 0),
  });

  const [loadArgs, setLoadArgs] = useState<GetAllItemsArgs>();
  const [page, setPage] = useState(1);

  const { data, isFetching } = itemsApi.useGetItemsQuery(loadArgs, {
    skip: !loadArgs || !categoryId,
  });

  const filters: ItemFilters = useMemo(
    () => ({
      categoryId: categoryId ? +categoryId : undefined,
      brandIds: queryParams.get('brandIds')
        ? queryParams.get('brandIds')?.split(',').map(Number)
        : undefined,
    }),
    [categoryId, queryParams],
  );

  // Change offset when filter is changed (reset to 0)
  useEffect(() => {
    setLoadArgs((prev) => ({
      ...prev,
      limit: ITEMS_PER_PAGE,
      offset: 0,
      ...filters,
    }));
  }, [filters]);

  // Change offset when page is changed
  useEffect(() => {
    setLoadArgs((prev) => ({
      ...prev,
      limit: ITEMS_PER_PAGE,
      offset: (page - 1) * ITEMS_PER_PAGE,
    }));
  }, [page]);

  const pagesCount = Math.ceil((data?.amount || 0) / ITEMS_PER_PAGE);

  const isHiddenPagination =
    isFetching ||
    !data ||
    data.amount <= ITEMS_PER_PAGE ||
    (!isPaid && !isAdmin);

  const addItemHandler = () => setAddEditItemPopupOpen(true);
  const showAllHandler = () => navigate(routes.items);

  return (
    <MainLayout ref={layoutRef}>
      <WithMenuLayout>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <Container sx={{ width: '100%', height: '100%' }}>
              <EmptyState
                text={'Выберите категорию'}
                description={'Или посмотрите всё, что есть'}
              >
                <Button variant="contained" onClick={showAllHandler}>
                  Показать всё
                </Button>
              </EmptyState>
            </Container>
          ) : (
            <>
              <Header
                sx={{ mt: 1, mb: 2 }}
                title=""
                left={<BreadCrumbs data={categories?.tree || []} />}
                right={
                  <IconButton
                    sx={{ p: 0 }}
                    title="Добавить товар в эту категорию"
                    onClick={addItemHandler}
                  >
                    <AddIcon />
                  </IconButton>
                }
              />
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
                    <EmptyState
                      text={'Здесь пока нет товаров'}
                      description={`Выберите подкатегорию или добавьте сюда что-нибудь`}
                    >
                      <Button variant={'contained'} onClick={addItemHandler}>
                        Добавить
                      </Button>
                    </EmptyState>
                  }
                />
              </WithPaginationLayout>
            </>
          )}
        </Box>
      </WithMenuLayout>
      {/*{isPaid && (*/}
      {/*  <ActionsButtons*/}
      {/*    handlers={{*/}
      {/*      addItemHandler,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      <AddEditItemPopup
        open={addItemPopupOpen}
        setOpen={setAddEditItemPopupOpen}
        category={categories?.tree[categories.tree.length - 1] || null}
        onAdd={() => setPage(1)}
      />
    </MainLayout>
  );
}

export default React.memo(CategoriesPage);
