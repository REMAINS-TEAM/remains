import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box, Button, IconButton, SpeedDialIcon } from '@mui/material';
import itemsApi from 'store/api/items';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import AddEditItemPopup from 'components/Popups/AddEditItemPopup';
import NotFoundPage from 'pages/NotFoundPage';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import BreadCrumbs from 'components/BreadCrumbs';
import categoriesApi from 'store/api/categories';
import Container from 'components/Container';
import NotificationPlate from 'components/NotificationPlate';
import routes from 'routes';

import useInfinityScroll from 'hooks/useInfinityScroll';
import userApi from 'store/api/user';

function CategoriesPage() {
  const { categoryId } = useParams();
  const notEmptyCategoryId = categoryId ? +categoryId : 0;
  const [addItemPopupOpen, setAddEditItemPopupOpen] = useState(false);

  const { isSuccess: isUserSuccess } = userApi.useMeQuery();
  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const navigate = useNavigate();

  const { data: categories } = categoriesApi.useGetAllQuery({
    parentId: notEmptyCategoryId,
  });

  const {
    handleScroll,
    items: categoryItems,
    isSuccess: isItemsSuccess,
    isFetchingPrev,
    isFetchingNext,
    error: getCategoryItemsError,
  } = useInfinityScroll(
    itemsApi.useGetItemsQuery,
    { categoryId: notEmptyCategoryId },
    { skip: notEmptyCategoryId === 0 },
  );

  const error = getCategoryItemsError as {
    status: number;
  };

  if (error) {
    switch (error.status) {
      case 404:
        return <NotFoundPage />;
      // TODO: Сделать всплывающую нотификацию об ошибке
    }
  }

  const addItemHandler = () => {
    setAddEditItemPopupOpen(true);
  };

  const showAllHandler = () => navigate(routes.items);

  return (
    <MainLayout onScroll={handleScroll}>
      <WithMenuLayout>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <>
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
            </>
          ) : (
            <>
              <Box sx={styles.headerContainer}>
                <BreadCrumbs data={categories?.tree || []} />
                <IconButton
                  sx={{ p: 0 }}
                  title="Добавить товар в эту категорию"
                  onClick={addItemHandler}
                >
                  <SpeedDialIcon />
                </IconButton>
              </Box>

              <ItemCards
                items={categoryItems}
                isFetchingPrev={isFetchingPrev}
                isFetchingNext={isFetchingNext}
              />

              {isUserSuccess &&
                !isPaid &&
                !isAdmin &&
                !!categoryItems.length && (
                  <NotificationPlate
                    title="Оплатите сервис, чтобы видеть все товары"
                    color="secondary"
                    sx={{ display: 'flex', justifyContent: 'center', pb: 4 }}
                  />
                )}
              {isItemsSuccess && !categoryItems?.length && (
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
              )}
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
      />
    </MainLayout>
  );
}

export default React.memo(CategoriesPage);
