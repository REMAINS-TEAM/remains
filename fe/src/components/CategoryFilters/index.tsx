import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import * as styles from './styles';
import BrandsFilter from 'components/CategoryFilters/BrandsFilter';

const CategoryFilters = ({
  categoryId,
  filters,
}: {
  categoryId: number;
  filters: any;
}) => {
  const isNotEmpty = Object.values(filters).some(
    (filter) => (filter as any)?.length,
  );

  return (
    <>
      <Box sx={styles.container}>
        {filters.brands?.length && <BrandsFilter />}
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
