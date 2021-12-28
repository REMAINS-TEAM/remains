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

function Categories() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [addItemPopupOpen, setAddItemPopupOpen] = useState(false);

  const { data: fetchedItems, isFetching } = itemsApi.useGetCategoryItemsQuery({
    categoryId,
    limit: 10,
    offset: 0,
  });

  const { data: category } = categoriesApi.useGetCategoryByIdQuery(
    categoryId || 0,
    {
      skip: !categoryId,
    },
  );

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
              description={
                'Посмотрите, что тут есть, переключая категории слева'
              }
            />
          ) : (
            <>
              <Box sx={styles.headerContainer}>
                <BreadCrumbs data={category?.tree} />
                <IconButton
                  sx={{ p: 0 }}
                  aria-label="add item"
                  title="Добавить товар в эту категорию"
                  onClick={addItemHandler}
                >
                  <SpeedDialIcon />
                </IconButton>
              </Box>

              {fetchedItems?.length ? (
                <ItemCards items={fetchedItems} isLoading={isFetching} />
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
