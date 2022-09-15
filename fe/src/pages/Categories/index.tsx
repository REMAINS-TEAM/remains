import React, { useEffect, useRef, useState } from 'react';
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
import itemsApi, { GetAllItemsArgs } from 'store/api/items';
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

function CategoriesPage() {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const { categoryId } = useParams();
  const [addItemPopupOpen, setAddEditItemPopupOpen] = useState(false);

  const navigate = useNavigate();

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const { data: categories } = categoriesApi.useGetAllQuery({
    parentId: +(categoryId || 0),
  });

  const [loadArgs, setLoadArgs] = useState<GetAllItemsArgs>();

  const { data, isFetching } = itemsApi.useGetItemsQuery(loadArgs, {
    skip: !loadArgs,
  });

  useEffect(() => {
    if (!categoryId) return;
    setLoadArgs((prev) => ({
      ...prev,
      limit: ITEMS_PER_PAGE,
      offset: 0,
      categoryId: +categoryId,
    }));
  }, [categoryId]);

  const pagesCount = Math.ceil((data?.amount || 0) / ITEMS_PER_PAGE);
  const isHiddenPagination =
    isFetching ||
    !data ||
    data.amount <= ITEMS_PER_PAGE ||
    (!isPaid && !isAdmin);

  const changePage = (page: number) =>
    setLoadArgs((prev) => ({
      ...prev,
      limit: ITEMS_PER_PAGE,
      offset: (page - 1) * ITEMS_PER_PAGE,
    }));

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
                count={pagesCount}
                hidden={isHiddenPagination}
                scrollContainerRef={layoutRef}
                onChangePage={changePage}
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
        // onAdd={() => setOffset(0)} //TODOs
      />
    </MainLayout>
  );
}

export default React.memo(CategoriesPage);
