import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
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

  return (
    <>
      <Box sx={styles.container}>
        <Filter
          title="Производитель"
          options={filterOptions.brands}
          onChange={(ids) => changeFilter('brandIds', ids)}
        />

        {isNotEmpty && (
          <Button variant="outlined" sx={{ mt: 2 }}>
            Применить фильтры
          </Button>
        )}
      </Box>
    </>
  );
};

export default CategoryFilters;
