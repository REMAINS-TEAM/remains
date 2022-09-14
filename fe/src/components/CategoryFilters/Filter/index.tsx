import React from 'react';
import { Box, Checkbox, Divider, List, Typography } from '@mui/material';
import * as styles from './styles';
import FilterListItem from './FilterListItem';

const Filter = ({
  items,
}: {
  items: { id: number; title: string }[] | null;
}) => {
  if (!items || !items?.length) return null;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Checkbox
          sx={{ p: 0, pl: 1.5, pr: 1 }}
          edge="start"
          checked={true}
          tabIndex={-1}
          disableRipple
        />
        <Typography variant="h3" color="secondary">
          Брэнд
        </Typography>
      </Box>
      <Divider />
      <List sx={styles.list}>
        {items.map((item) => (
          <FilterListItem {...item} />
        ))}
      </List>
    </Box>
  );
};

export default Filter;
