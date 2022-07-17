import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box, Button, IconButton, SpeedDialIcon } from '@mui/material';
import itemsApi from 'store/api/items';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import AddItemPopup from 'components/Popups/AddItemPopup';
import NotFoundPage from 'pages/NotFoundPage';
import { useSelector } from 'react-redux';
import { getPaymentNotExpiredStatus } from 'store/selectors/user';
import BreadCrumbs from 'components/BreadCrumbs';
import categoriesApi from 'store/api/categories';

function CategoriesPage() {
  const { categoryId } = useParams();
  const [addItemPopupOpen, setAddItemPopupOpen] = useState(false);

  const paymentNotExpired = useSelector(getPaymentNotExpiredStatus);

  const {
    data: categories,
    isFetching: isCategoriesFetching,
    isSuccess: isCategoriesSuccess,
  } = categoriesApi.useGetAllCategoriesQuery({
    parentId: categoryId ? +categoryId : 0,
  });

  const {
    data: categoryItems,
    isFetching: isItemFetching,
    error: getCategoryItemsError,
  } = itemsApi.useGetItemsQuery({
    categoryId,
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

  return (
    <MainLayout>
      <WithMenuLayout>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <EmptyState
              text={'Выберите категорию'}
              description={'Посмотрите, что тут есть, переключая категории'}
            />
          ) : (
            <>
              <Box sx={styles.headerContainer}>
                <BreadCrumbs data={categories?.tree || []} />
                {paymentNotExpired && (
                  <IconButton
                    sx={{ p: 0 }}
                    title="Добавить товар в эту категорию"
                    onClick={addItemHandler}
                  >
                    <SpeedDialIcon />
                  </IconButton>
                )}
              </Box>

              {categoryItems?.length ? (
                <ItemCards items={categoryItems} isLoading={isItemFetching} />
              ) : (
                <EmptyState
                  text={'Здесь пока нет товаров'}
                  description={`Выберите подкатегорию${
                    paymentNotExpired ? ' или добавьте сюда что-нибудь' : ''
                  }`}
                >
                  {paymentNotExpired && (
                    <Button variant={'contained'} onClick={addItemHandler}>
                      Добавить
                    </Button>
                  )}
                </EmptyState>
              )}
            </>
          )}
        </Box>
      </WithMenuLayout>
      {/*{paymentNotExpired && (*/}
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
