import React, { useEffect, useRef, useState } from 'react';
import {
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  AccountTreeOutlined as CategoriesIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Inventory2Outlined as ProductsIcon,
  BusinessOutlined as CompaniesIcon,
} from '@mui/icons-material';
import * as styles from './styles';

function Search() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clearInput = () => {
    setValue('');
  };

  const showDropdown = () => {
    if (inputRef?.current && value.length) {
      setAnchorEl((prev) => (!prev ? inputRef?.current : prev));
      inputRef.current.focus();
    }
  };

  const hideDropdown = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (value.length) {
      showDropdown();
    } else {
      hideDropdown();
    }
  }, [value]);

  return (
    <>
      <Paper component="form" sx={styles.inputPaper}>
        <InputBase
          ref={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по категориям и товарам"
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={showDropdown}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search" onClick={clearInput}>
          {!value.length ? <SearchIcon /> : <CloseIcon />}
        </IconButton>
      </Paper>

      <Menu
        autoFocus={false}
        disableAutoFocus
        disableAutoFocusItem
        disableEnforceFocus
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={hideDropdown}
        onClick={hideDropdown}
        PaperProps={{ elevation: 0, sx: styles.menuPaper }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem disabled>
          <ListItemIcon>
            <CategoriesIcon fontSize="small" />
          </ListItemIcon>
          Категории
        </MenuItem>
        <Divider />
        <MenuItem>Категория 1</MenuItem>
        <MenuItem>Категория 2</MenuItem>
        <MenuItem>Категория 3</MenuItem>
        <Divider />
        <MenuItem disabled>
          <ListItemIcon>
            <ProductsIcon fontSize="small" />
          </ListItemIcon>
          Товары
        </MenuItem>
        <Divider />
        <MenuItem>Товар 1</MenuItem>
        <MenuItem>Товар 2</MenuItem>
        <MenuItem>Товар 3</MenuItem>
        <Divider />
        <MenuItem disabled>
          <ListItemIcon>
            <CompaniesIcon fontSize="small" />
          </ListItemIcon>
          Компании
        </MenuItem>
        <Divider />
        <MenuItem>Компания 1</MenuItem>
        <MenuItem>Компания 2</MenuItem>
        <MenuItem>Компания 3</MenuItem>
      </Menu>
    </>
  );
}

export default React.memo(Search);
