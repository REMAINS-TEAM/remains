import React, { ReactNode, useEffect } from 'react';
import * as styles from './styles';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import CategoriesTree from 'components/CategoriesTree';
import { Category } from 'store/slices/categories';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuState } from 'store/selectors/menu';
import { setShowBurger } from 'store/slices/menu';

const WithMenuLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const menu = useSelector(getMenuState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const onSelectCategoryHandler = (tree: Category[]) => {
    if (!tree.length || tree[tree.length - 1]?.id === 0) {
      return navigate(routes.main);
    }

    navigate(
      generatePath(routes.category, {
        categoryId: String(tree[tree.length - 1].id),
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
          <CategoriesTree onSelect={onSelectCategoryHandler} />
        </Box>
      )}
      {!(menu.open && isMobile) && (
        <Box sx={styles.contentContainer}>{children}</Box>
      )}
    </>
  );
};

export default React.memo(WithMenuLayout);
