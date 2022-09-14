import React, { ReactNode, useEffect } from 'react';
import * as styles from './styles';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import CategoriesTree from 'components/CategoriesTree';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuState } from 'store/selectors/menu';
import { setShowBurger } from 'store/slices/menu';
import { AppDispatch } from 'store';
import CategoryFilters from 'components/CategoryFilters';
import categoriesApi from 'store/api/categories';

const WithMenuLayout = ({ children }: { children: ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();

  const menu = useSelector(getMenuState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { data, isFetching } = categoriesApi.useGetAllQuery({
    parentId: +(categoryId || 0),
  });

  const onSelectCategoryHandler = (categoryId: number) => {
    if (categoryId === 0) return navigate(routes.main);

    navigate(
      generatePath(routes.category, {
        categoryId: String(categoryId),
      }),
    );
  };

  useEffect(() => {
    dispatch(setShowBurger(true));
    return () => {
      dispatch(setShowBurger(false));
    };
  }, []);

  return (
    <>
      {menu.open && (
        <Box sx={styles.menuWithHeaderContainer}>
          <CategoriesTree
            onSelect={onSelectCategoryHandler}
            data={data}
            isFetching={isFetching}
          />
          {categoryId && !isFetching && data?.filters && (
            <CategoryFilters
              categoryId={+categoryId}
              filterOptions={data.filters}
            />
          )}
        </Box>
      )}
      {!(menu.open && isMobile) && (
        <Box sx={styles.contentContainer}>{children}</Box>
      )}
    </>
  );
};

export default React.memo(WithMenuLayout);
