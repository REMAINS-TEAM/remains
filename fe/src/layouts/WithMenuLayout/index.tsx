import React, { ReactNode, useState } from 'react';
import * as styles from './styles';
import {
  Box,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Container from 'components/Container';
import CategoriesTree from 'components/CategoriesTree';
import { Category } from 'store/slices/categories';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useSelector } from 'react-redux';
import { getMenuState } from 'store/selectors/menu';

const WithMenuLayout = ({ children }: { children: ReactNode }) => {
  const menu = useSelector(getMenuState);

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

  return (
    <>
      {menu.open && (
        <Box sx={styles.menuWithHeaderContainer}>
          <Box sx={styles.header} />
          <Container sx={styles.menuContainer}>
            <CategoriesTree onSelect={onSelectCategoryHandler} />
          </Container>
        </Box>
      )}
      <Box sx={styles.contentContainer}>{children}</Box>
    </>
  );
};

export default React.memo(WithMenuLayout);
