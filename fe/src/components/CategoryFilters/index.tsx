import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import * as styles from './styles';
import Filter from 'components/CategoryFilters/Filter';
import { CategoryFiltersProps, FilterValues } from './types';

const CategoryFilters = ({
  categoryId,
  filterOptions,
}: CategoryFiltersProps) => {
  const [filters, setFilters] = useState<FilterValues | null>(null);

  const isNotEmpty = Object.values(filterOptions).some(
    (option) => option?.length,
  );

  const changeFilter = (name: keyof FilterValues, ids: number[]) => {
    setFilters((prev) => ({ ...prev, [name]: ids }));
  };

  useEffect(() => {
    // console.log('Тут вызываем функцию из пропсов');
    // показывать ошибку если не выбран ин один бренд
    console.log('filters', filters);
  }, [filters]);

  if (!isNotEmpty) return null;

  return (
    <Box sx={{ mt: 3 }}>
      {/*<Typography*/}
      {/*  variant="subtitle2"*/}
      {/*  color="secondary"*/}
      {/*  sx={{ pl: 2.5, fontWeight: 600, mb: 1 }}*/}
      {/*>*/}
      {/*  Фильтры:*/}
      {/*</Typography>*/}
      <Box sx={styles.container}>
        <Filter
          title="Брэнды"
          options={filterOptions.brands}
          onChange={(ids) => changeFilter('brandIds', ids)}
        />

        <Button variant="contained" sx={{ mt: 2 }}>
          Применить фильтры
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryFilters;
