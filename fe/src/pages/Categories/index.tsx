import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import {
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import BreadCrumbs from 'components/BreadCrumbs';
import itemsApi from 'store/api/items';
import routes from 'routes';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import categoriesApi from 'store/api/categories';
import {
  Inventory2 as ItemAddIcon,
  PlaylistAdd as CategoryAddIcon,
} from '@mui/icons-material';
import AddItemPopup from 'components/Popups/AddItemPopup';

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
                {/*<IconButton*/}
                {/*  sx={{ p: 0 }}*/}
                {/*  aria-label="add item"*/}
                {/*  title="Добавить товар в эту категорию"*/}
                {/*  onClick={addItemHandler}*/}
                {/*>*/}
                {/*  <AddIcon />*/}
                {/*</IconButton>*/}
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
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          title={'Добавить товар в эту категорию'}
          icon={<ItemAddIcon />}
          onClick={addItemHandler}
        />
        <SpeedDialAction
          title={'Добавить подкатегорию (только для администратора)'}
          icon={<CategoryAddIcon />}
        />
      </SpeedDial>
      <AddItemPopup
        open={addItemPopupOpen}
        setOpen={setAddItemPopupOpen}
        category={category?.category}
      />
    </MainLayout>
  );
}

export default React.memo(Categories);
