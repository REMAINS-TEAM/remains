import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import WithMenuLayout from 'layouts/WithMenuLayout';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import * as styles from './styles';
import { Box, Button, IconButton, SpeedDialIcon } from '@mui/material';
import itemsApi from 'store/api/items';
import routes from 'routes';
import ItemCards from 'pages/Categories/units/ItemCards';
import EmptyState from 'components/EmptyState';
import AddItemPopup from 'components/Popups/AddItemPopup';
import NotFoundPage from 'pages/NotFoundPage';
import { useSelector } from 'react-redux';
import { getPaymentNotExpiredStatus } from 'store/selectors/user';
import { Category } from 'store/slices/categories';
import BreadCrumbs from 'components/BreadCrumbs';

function CategoriesPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [categoriesTree, setCategoriesTree] = useState<Category[]>([]);

  const paymentNotExpired = useSelector(getPaymentNotExpiredStatus);

  const [addItemPopupOpen, setAddItemPopupOpen] = useState(false);

  const {
    data: categoryItems,
    isFetching,
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

  const selectCategoryHandler = (tree: Category[]) => {
    setCategoriesTree(tree);
    navigate(
      tree.length
        ? generatePath(routes.category, {
            categoryId: String(tree[tree.length - 1].id),
          })
        : routes.main,
    );
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
                <BreadCrumbs data={categoriesTree} />
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
                <ItemCards items={categoryItems} isLoading={isFetching} />
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
        category={categoriesTree[categoriesTree.length - 1]}
      />
    </MainLayout>
  );
}

export default React.memo(CategoriesPage);
