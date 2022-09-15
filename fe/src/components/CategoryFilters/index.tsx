import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import * as styles from './styles';
import Filter from './Filter';
import { CategoryFiltersProps, FilterValues } from './types';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const CategoryFilters = ({
  categoryId,
  filterOptions,
}: CategoryFiltersProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState<FilterValues | null>(null);

  const isNotEmpty = Object.values(filterOptions).some(
    (option) => option?.length,
  );

  const changeFilter = (name: keyof FilterValues, ids: number[]) => {
    setFilters((prev) => ({ ...prev, [name]: ids }));
  };

  // TODO: показывать ошибку если не выбран ин один бренд

  const applyFilters = () => {
    const query = {
      ...(filters?.brandIds.length && { brandIds: filters.brandIds.join(',') }),
    };

    navigate(`${location.pathname}?${new URLSearchParams(query)}`);
  };

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

        <Button variant="contained" onClick={applyFilters} sx={{ mt: 2 }}>
          Применить фильтры
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryFilters;
