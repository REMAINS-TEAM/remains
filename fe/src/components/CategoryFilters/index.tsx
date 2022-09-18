import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import * as styles from './styles';
import Filter from './Filter';
import { CategoryFiltersProps, FilterValues } from './types';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { PrecisionManufacturingOutlined as BrandsIcon } from '@mui/icons-material';

const CategoryFilters = ({ filterOptions }: CategoryFiltersProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState<FilterValues | null>(null);

  const isNotEmpty = Object.values(filterOptions).some(
    (option) => option?.length,
  );

  const changeFilter = (name: keyof FilterValues, ids: number[]) => {
    setFilters((prev) => ({ ...prev, [name]: ids }));
  };

  const applyFilters = () => {
    const query = {
      ...(filters?.brandIds.length && { brandIds: filters.brandIds.join(',') }),
    };

    navigate(`${location.pathname}?${new URLSearchParams(query)}`);
  };

  if (!isNotEmpty) return null;

  return (
    <Box sx={styles.container}>
      <Filter
        title="Производитель"
        icon={<BrandsIcon />}
        defaultExpanded
        options={filterOptions.brands}
        onChange={(ids) => changeFilter('brandIds', ids)}
      />

      <Button variant="outlined" onClick={applyFilters} sx={{ mt: 1.5 }}>
        Применить фильтры
      </Button>
    </Box>
  );
};

export default CategoryFilters;
