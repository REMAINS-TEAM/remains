import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
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
import { useDispatch } from 'react-redux';
import { setOpen } from 'store/slices/menu';

const CategoryFilters = ({ filterOptions }: CategoryFiltersProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const queryParams = useRouterQuery();

  const [filters, setFilters] = useState<FilterValues | null>(null);

  const isNotEmpty = Object.values(filterOptions).some(
    (option) => option?.length,
  );

  const hideMobileMenu = () => dispatch(setOpen(false));

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

    if (isMobile) hideMobileMenu();
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
        title="Брэнд"
        icon={<BrandsIcon />}
        defaultSelectedIds={defaultFilters[filterNames.BRAND_IDS]}
        defaultExpanded
        options={filterOptions.brands}
        onChange={(ids) => changeFilter(filterNames.BRAND_IDS, ids)}
      />

      <Button variant="contained" onClick={applyFilters} sx={{ mt: 1.5 }}>
        Применить
      </Button>
    </Box>
  );
};

export default CategoryFilters;
