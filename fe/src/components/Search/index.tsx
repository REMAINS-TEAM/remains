import React, { useEffect, useRef, useState } from 'react';
import {
  CircularProgress,
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
  BusinessOutlined as CompaniesIcon,
  Close as CloseIcon,
  Inventory2Outlined as ProductsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import * as styles from './styles';
import searchApi from 'store/api/search';
import useDebounce from 'hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

const MIN_SEARCH_LENGTH = 3;

function Search() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, MIN_SEARCH_LENGTH);
  const { data, isFetching, isSuccess } = searchApi.useSearchQuery(
    debouncedValue,
    {
      skip: !debouncedValue.length,
    },
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clearInput = () => {
    setValue('');
  };

  const showDropdown = () => {
    if (inputRef?.current && value.length >= MIN_SEARCH_LENGTH) {
      setAnchorEl((prev) => (!prev ? inputRef?.current : prev));
      inputRef.current.focus();
    }
  };

  const hideDropdown = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isSuccess && !isFetching) showDropdown();
  }, [isSuccess, debouncedValue, isFetching]);

  useEffect(() => {
    if (value.length < MIN_SEARCH_LENGTH) hideDropdown();
  }, [value]);

  const itemClickHandler =
    (type: 'categories' | 'items' | 'companies', id: number) => () =>
      navigate(`/${type}/${id}`);

  return (
    <>
      <Paper component="div" sx={styles.inputPaper}>
        <InputBase
          ref={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по сайту"
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={showDropdown}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search" onClick={clearInput}>
          {isFetching && <CircularProgress size={18} />}
          {!isFetching && (!value.length ? <SearchIcon /> : <CloseIcon />)}
        </IconButton>
      </Paper>

      <Menu
        disablePortal
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
        sx={{ '& *': { fontSize: 14 } }}
      >
        {/*TODO: выделить в отдельный компонент*/}
        <MenuItem disabled sx={styles.menuItemHeader}>
          <ListItemIcon>
            <CategoriesIcon fontSize="small" />
          </ListItemIcon>
          Категории
        </MenuItem>
        {/*<Divider />*/}
        {}
        {data?.categories.length ? (
          data.categories.map((category) => (
            <MenuItem
              key={category.id}
              sx={styles.menuItem}
              onClick={itemClickHandler('categories', category.id)}
            >
              {category.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled sx={styles.menuItem}>
            Тут ничего не нашли
          </MenuItem>
        )}
        <Divider />
        <MenuItem disabled sx={styles.menuItemHeader}>
          <ListItemIcon>
            <ProductsIcon fontSize="small" />
          </ListItemIcon>
          Товары
        </MenuItem>
        {/*<Divider />*/}
        {data?.items.length ? (
          data.items.map((item) => (
            <MenuItem
              key={item.id}
              sx={styles.menuItem}
              onClick={itemClickHandler('items', item.id)}
            >
              {item.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled sx={styles.menuItem}>
            Тут ничего не нашли
          </MenuItem>
        )}
        <Divider />
        <MenuItem disabled sx={styles.menuItemHeader}>
          <ListItemIcon>
            <CompaniesIcon fontSize="small" />
          </ListItemIcon>
          Компании
        </MenuItem>
        {/*<Divider />*/}
        {data?.companies.length ? (
          data.companies.map((company) => (
            <MenuItem
              key={company.id}
              sx={styles.menuItem}
              onClick={itemClickHandler('companies', company.id)}
            >
              {company.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled sx={styles.menuItem}>
            Тут ничего не нашли
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default React.memo(Search);
