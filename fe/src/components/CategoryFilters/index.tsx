import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import * as styles from './styles';
import Filter from './Filter';
import {
  CategoryFiltersProps,
  FilterName,
  filterNames,
  FilterValues,
} from './types';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { PrecisionManufacturingOutlined as BrandsIcon } from '@mui/icons-material';
import useRouterQuery from 'hooks/useRouterQuery';

const CategoryFilters = ({ filterOptions }: CategoryFiltersProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useRouterQuery();

  const [filters, setFilters] = useState<FilterValues | null>(null);

  const isNotEmpty = Object.values(filterOptions).some(
    (option) => option?.length,
  );

  const changeFilter = (name: FilterName, ids: number[]) => {
    setFilters((prev) => ({ ...prev, [name]: ids }));
  };

  const applyFilters = () => {
    const query = {
      ...(filters?.brandIds?.length && {
        brandIds: filters.brandIds.join(','),
      }),
    };

    navigate(`${location.pathname}?${new URLSearchParams(query)}`);
  };

  const defaultFilters: FilterValues = useMemo(
    () => ({
      [filterNames.BRAND_IDS]: queryParams
        .get(filterNames.BRAND_IDS)
        ?.split(',')
        .map(Number),
    }),
    [queryParams],
  );

  if (!isNotEmpty) return null;

  return (
    <Box sx={styles.container}>
      <Filter
        title="Производитель"
        icon={<BrandsIcon />}
        defaultSelectedIds={defaultFilters[filterNames.BRAND_IDS]}
        defaultExpanded
        options={filterOptions.brands}
        onChange={(ids) => changeFilter(filterNames.BRAND_IDS, ids)}
      />

      <Button variant="outlined" onClick={applyFilters} sx={{ mt: 1.5 }}>
        Применить фильтры
      </Button>
    </Box>
  );
};

export default CategoryFilters;
