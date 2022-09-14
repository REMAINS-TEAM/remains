import React from 'react';
import { Box, Divider, List, Typography } from '@mui/material';
import * as styles from './styles';
import { ICategoryFilters } from 'store/api/categories';
import { FactoryOutlined as BrandsIcon } from '@mui/icons-material';
import BrandItem from './BrandItem';

const BrandsFilter = ({ brands }: { brands: ICategoryFilters['brands'] }) => {
  if (!brands || !brands?.length) return null;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <BrandsIcon />
        <Typography variant="h3" color="secondary">
          Производитель
        </Typography>
      </Box>
      <Divider />
      <List sx={styles.list}>
        <BrandItem title={'Все'} />
        {brands.map((brand) => (
          <BrandItem {...brand} />
        ))}
      </List>
    </Box>
  );
};

export default BrandsFilter;
