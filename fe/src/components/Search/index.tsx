import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Menu,
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
import ItemsGroup from 'components/Search/ItemsGroup';
import { ItemType } from 'components/Search/ItemsGroup/types';
import EmptyState from 'components/EmptyState';

const MIN_SEARCH_LENGTH = 2;

function Search() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, MIN_SEARCH_LENGTH);

  const { data, isFetching, isSuccess } = searchApi.useSearchQuery(
    debouncedValue,
    { skip: !debouncedValue.length },
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clearInput = () => setValue('');

  const showDropdown = () => {
    if (inputRef?.current && value.length >= MIN_SEARCH_LENGTH) {
      setAnchorEl((prev) => (!prev ? inputRef?.current : prev));
      inputRef.current.focus();
    }
  };

  const hideDropdown = () => setAnchorEl(null);

  useEffect(() => {
    if (isSuccess && !isFetching) showDropdown();
  }, [isSuccess, debouncedValue, isFetching]);

  useEffect(() => {
    if (value.length < MIN_SEARCH_LENGTH) hideDropdown();
  }, [value]);

  const itemGroups = useMemo(
    () =>
      [
        {
          title: 'Категории',
          icon: <CategoriesIcon fontSize="small" />,
          items: data?.categories,
          type: ItemType.CATEGORIES,
        },
        {
          title: 'Продукты',
          icon: <ProductsIcon fontSize="small" />,
          items: data?.items,
          type: ItemType.ITEMS,
        },
        {
          title: 'Компании',
          icon: <CompaniesIcon fontSize="small" />,
          items: data?.companies,
          type: ItemType.COMPANIES,
        },
      ].filter((g) => g.items?.length),
    [data],
  );

  return (
    <>
      <Paper sx={styles.inputPaper}>
        <InputBase
          ref={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по сайту"
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={showDropdown}
        />
        <IconButton
          sx={{ p: 1 }}
          aria-label="search"
          disabled={isFetching}
          onClick={clearInput}
        >
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
      >
        {itemGroups.length ? (
          itemGroups.map((group, i) => [
            <ItemsGroup
              title={group.title}
              icon={group.icon}
              items={group.items}
              type={group.type}
            />,
            i !== itemGroups.length - 1 && <Divider />,
          ])
        ) : (
          <Box sx={{ position: 'relative', height: 100 }}>
            <EmptyState
              text="Ничего не нашлось"
              description="Попробуйте изменить запрос"
              sx={styles.emptyState}
            />
          </Box>
        )}
      </Menu>
    </>
  );
}

export default React.memo(Search);
