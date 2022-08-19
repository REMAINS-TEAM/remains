import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box, Button, IconButton, SpeedDialIcon } from '@mui/material';
import itemsApi from 'store/api/items';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import AddItemPopup from 'components/Popups/AddItemPopup';
import NotFoundPage from 'pages/NotFoundPage';
import { useSelector } from 'react-redux';
import { getPaidStatus } from 'store/selectors/user';
import BreadCrumbs from 'components/BreadCrumbs';
import categoriesApi from 'store/api/categories';
import Container from 'components/Container';
import NotificationPlate from 'components/NotificationPlate';
import routes from 'routes';

function CategoriesPage() {
  const { categoryId } = useParams();
  const notEmptyCategoryId = categoryId ? +categoryId : 0;
  const [addItemPopupOpen, setAddItemPopupOpen] = useState(false);

  const isPaid = useSelector(getPaidStatus);

  const navigate = useNavigate();

  const { data: categories } = categoriesApi.useGetAllQuery({
    parentId: notEmptyCategoryId,
  });

  const {
    data: categoryItems,
    isFetching: isItemFetching,
    error: getCategoryItemsError,
  } = itemsApi.useGetItemsQuery({
    categoryId: notEmptyCategoryId,
    limit: 100, // TODO: lazy loading
    offset: 0,
  });

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
    setAddItemPopupOpen(true);
  };

  const showAllHandler = () => navigate(routes.items);

  return (
    <MainLayout>
      <WithMenuLayout>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <>
              <Box sx={styles.headerContainer} />
              <Container sx={{ width: '100%', height: '100%' }}>
                <EmptyState
                  text={'Выберите категорию'}
                  description={'Или посмотрите все, что есть'}
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

              {categoryItems?.length ? (
                <>
                  <ItemCards items={categoryItems} isLoading={isItemFetching} />
                  {!isPaid && (
                    <NotificationPlate
                      title="Оплатите сервис, чтобы видеть все товары"
                      color="secondary"
                      sx={{ display: 'flex', justifyContent: 'center', pb: 4 }}
                    />
                  )}
                </>
              ) : (
                <Container sx={{ width: '100%', height: '100%' }}>
                  <EmptyState
                    text={'Здесь пока нет товаров'}
                    description={`Выберите подкатегорию${
                      isPaid ? ' или добавьте сюда что-нибудь' : ''
                    }`}
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
      <AddItemPopup
        open={addItemPopupOpen}
        setOpen={setAddItemPopupOpen}
        category={categories?.tree[categories.tree.length - 1] || null}
      />
    </MainLayout>
  );
}

export default React.memo(CategoriesPage);
