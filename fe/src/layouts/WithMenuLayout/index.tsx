import React, { ReactNode } from 'react';
import * as styles from './styles';
import { Box, Typography } from '@mui/material';
import Container from 'components/Container';
import CategoriesTree from 'components/CategoriesTree';
import { Category } from 'store/slices/categories';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';

const WithMenuLayout = ({ children }: { children: ReactNode }) => {
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
      <Box sx={styles.menuWithHeaderContainer}>
        <Box sx={styles.header}>
          <Typography variant="h3" color="secondary">
            Категории
          </Typography>
        </Box>
        <Container sx={styles.menuContainer}>
          <CategoriesTree onSelect={onSelectCategoryHandler} />
        </Container>
      </Box>
      <Box sx={styles.contentContainer}>{children}</Box>
    </>
  );
};

export default React.memo(WithMenuLayout);
