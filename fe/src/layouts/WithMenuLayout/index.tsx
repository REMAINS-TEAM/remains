import React, { ReactNode } from 'react';
import * as styles from './styles';
import { Box, Typography } from '@mui/material';
import Container from 'components/Container';
import CategoriesTree from 'components/CategoriesTree';
import { useDispatch } from 'react-redux';
import { Category, setTree } from 'store/slices/categories';

const WithMenuLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const onSelectCategoryHandler = (tree: Category[]) => {
    dispatch(setTree(tree));
  };

  return (
    <>
      <Box sx={styles.menuWithHeaderContainer}>
        <Box sx={styles.header}>
          <Typography>Категории</Typography>
        </Box>
        <Container sx={styles.menuContainer}>
          <CategoriesTree onSelect={onSelectCategoryHandler} />
        </Container>
      </Box>
      {children}
    </>
  );
};

export default React.memo(WithMenuLayout);
