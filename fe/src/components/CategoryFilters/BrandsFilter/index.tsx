import React from 'react';
import {
  Box,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import * as styles from './styles';
import { ICategoryFilters } from 'store/api/categories';
import { Factory as BrandsIcon } from '@mui/icons-material';
import BrandItem from 'components/CategoryFilters/BrandsFilter/BrandItem';

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
        {/*Должен приходить с бэка*/}
        <BrandItem id={0} title={'Не указан'} />
      </List>
    </Box>
  );
};

export default BrandsFilter;
