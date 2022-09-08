import React, { useState } from 'react';
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
import itemsApi from 'store/api/items';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import AddEditItemPopup from 'components/Popups/AddEditItemPopup';
import BreadCrumbs from 'components/BreadCrumbs';
import categoriesApi from 'store/api/categories';
import Container from 'components/Container';
import routes from 'routes';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import { Item } from 'store/slices/items';
import InfiniteScroll from 'components/InfiniteScroll';
import Spinner from 'components/Spinner';

function CategoriesPage() {
  const { categoryId } = useParams();
  const [addItemPopupOpen, setAddEditItemPopupOpen] = useState(false);

  const navigate = useNavigate();

  const { data: categories } = categoriesApi.useGetAllQuery({
    parentId: +(categoryId || 0),
  });

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const addItemHandler = () => setAddEditItemPopupOpen(true);
  const showAllHandler = () => navigate(routes.items);

  return (
    <MainLayout>
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
            <InfiniteScroll<Item>
              hasMore={isPaid || isAdmin}
              loadHook={itemsApi.useGetItemsQuery}
              hookArgs={{ categoryId }}
              showEndText={isPaid || isAdmin}
              emptyStateComponent={
                <Container sx={{ width: '100%', height: '100%' }}>
                  <EmptyState
                    text={'Здесь пока нет товаров'}
                    description={`Выберите подкатегорию или добавьте сюда что-нибудь`}
                  >
                    <Button variant={'contained'} onClick={addItemHandler}>
                      Добавить
                    </Button>
                  </EmptyState>
                </Container>
              }
            >
              {({ items, loadHookResult: { isFetching } }) => (
                <>
                  <Box sx={styles.headerContainer}>
                    <BreadCrumbs data={categories?.tree || []} />
                    <IconButton
                      sx={{ p: 0 }}
                      title="Добавить товар в эту категорию"
                      onClick={addItemHandler}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {isFetching && !items.length && (
                    <Spinner sx={{ height: 30 }} />
                  )}
                  {!!items.length && (
                    <ItemCards items={items} isFetching={isFetching} />
                  )}
                </>
              )}
            </InfiniteScroll>
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
      />
    </MainLayout>
  );
}

export default React.memo(CategoriesPage);
