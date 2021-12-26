import React from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import MainLayout from 'layouts/MainLayout';
import BreadCrumbs from 'components/BreadCrumbs';
import ItemCard from 'components/ItemCard';
import WithMenuLayout from 'layouts/WithMenuLayout';

// TODO linter

function MainPage() {
  return (
    <MainLayout>
      <WithMenuLayout>
        <Box sx={styles.contentContainer}>
          <Box sx={styles.header}>
            <BreadCrumbs />
          </Box>
          <Box sx={styles.itemsContainer}>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </Box>
        </Box>
      </WithMenuLayout>
    </MainLayout>
  );
}

export default React.memo(MainPage);
