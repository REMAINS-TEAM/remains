import React from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

function Search() {
  return (
    <Paper
      component="form"
      sx={{
        p: '1px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 310,
        height: 36,
        ml: 1,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск по категориям и товарам"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default React.memo(Search);
