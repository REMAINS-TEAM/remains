import React from 'react';
import { Box, Button } from '@mui/material';
import * as styles from './styles';
import Filter from 'components/CategoryFilters/Filter';
import { ICategoryFilters } from 'store/api/categories';

const CategoryFilters = ({
  categoryId,
  filters,
}: {
  categoryId: number;
  filters: ICategoryFilters;
}) => {
  const isNotEmpty = Object.values(filters).some((filter) => filter?.length);

  return (
    <>
      <Box sx={styles.container}>
        <Filter items={filters.brands} />
        {isNotEmpty && (
          <Button variant="outlined" sx={{ mt: 1 }}>
            Применить фильтры
          </Button>
        )}
      </Box>
    </>
  );
};

export default CategoryFilters;
