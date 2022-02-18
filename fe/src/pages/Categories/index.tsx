import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box, Button, IconButton, SpeedDialIcon } from '@mui/material';
import BreadCrumbs from 'components/BreadCrumbs';
import itemsApi from 'store/api/items';
import routes from 'routes';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import categoriesApi from 'store/api/categories';
import AddItemPopup from 'components/Popups/AddItemPopup';
import ActionsButtons from 'pages/Categories/units/ActionsButtons';
import NotFoundPage from 'pages/NotFoundPage';

function Categories() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [addItemPopupOpen, setAddItemPopupOpen] = useState(false);

  const {
    data: categoryItems,
    isFetching,
    error: getCategoryItemsError,
  } = itemsApi.useGetCategoryItemsQuery({
    categoryId,
    limit: 10, // TODO: lazy loading
    offset: 0,
  });

  const {
    data: category,
    error: getCategoryByIdError,
  } = categoriesApi.useGetCategoryByIdQuery(categoryId || 0, {
    skip: !categoryId,
  });

  const error = (getCategoryItemsError || getCategoryByIdError) as {
    status: number;
  };

  if (error) {
    switch (error.status) {
      case 404:
        return <NotFoundPage />;
      // TODO: Сделать всплывающую нотификацию об ошибке
    }
  }

  const selectCategoryHandler = (categoryId: number) => {
    navigate(generatePath(routes.category, { categoryId: String(categoryId) }));
  };

  const addItemHandler = () => {
    setAddItemPopupOpen(true);
  };

  return (
    <MainLayout>
      <WithMenuLayout onSelect={selectCategoryHandler}>
        <Box sx={styles.contentContainer}>
          {!categoryId ? (
            <EmptyState
              text={'Выберите категорию'}
              description={'Посмотрите, что тут есть, переключая категории'}
            />
          ) : (
            <>
              <Box sx={styles.headerContainer}>
                <BreadCrumbs data={category?.tree} />
                <IconButton
                  sx={{ p: 0 }}
                  title="Добавить товар в эту категорию"
                  onClick={addItemHandler}
                >
                  <SpeedDialIcon />
                </IconButton>
              </Box>

              {categoryItems?.length ? (
                <ItemCards items={categoryItems} isLoading={isFetching} />
              ) : (
                <EmptyState
                  text={'Здесь пока нет товаров'}
                  description={
                    'Выберите подкатегорию или добавьте сюда что-нибудь'
                  }
                >
                  <Button variant={'contained'} onClick={addItemHandler}>
                    Добавить
                  </Button>
                </EmptyState>
              )}
            </>
          )}
        </Box>
      </WithMenuLayout>
      <ActionsButtons
        handlers={{
          addItemHandler,
        }}
      />
      <AddItemPopup
        open={addItemPopupOpen}
        setOpen={setAddItemPopupOpen}
        category={category?.category}
      />
    </MainLayout>
  );
}

export default React.memo(Categories);
