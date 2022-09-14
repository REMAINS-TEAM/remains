import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Divider, List, Typography } from '@mui/material';
import * as styles from './styles';
import FilterListItem from './FilterListItem';

const Filter = ({
  title,
  options,
  onChange,
}: {
  title: string;
  options: { id: number; title: string }[] | null;
  onChange?: (ids: number[]) => void;
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isAllSelected = selectedIds.length === options?.length;

  const selectAllHandler = () => {
    setSelectedIds(isAllSelected ? [] : options?.map(({ id }) => id) || []);
  };

  useEffect(() => {
    if (!options) return;
    selectAllHandler();
  }, [options]);

  useEffect(() => {
    if (!onChange) return;
    onChange(isAllSelected ? [] : selectedIds);
  }, [selectedIds]);

  if (!options || !options?.length) return null;

  const onChangeItemChecked = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((_id) => _id !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Checkbox
          sx={{ p: 0, pl: 1.5, pr: 1 }}
          edge="start"
          checked={isAllSelected}
          onChange={selectAllHandler}
          tabIndex={-1}
          disableRipple
        />
        <Typography variant="h3" color="secondary">
          {title}
        </Typography>
      </Box>
      <Divider />
      <List sx={styles.list}>
        {options.map(({ id, title }) => (
          <FilterListItem
            key={id}
            id={id}
            title={title}
            checked={selectedIds.includes(id)}
            onChange={onChangeItemChecked}
          />
        ))}
      </List>
    </Box>
  );
};

export default Filter;
