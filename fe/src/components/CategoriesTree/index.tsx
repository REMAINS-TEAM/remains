import React, { useState } from 'react';
import * as styles from './styles';
import BackButton from 'components/BackButton';
import {
  AccountTreeOutlined as FolderIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import TreeItem from './units/TreeItem';
import { CategoriesTreeProps } from './types';
import { setOpen } from 'store/slices/menu';
import { useDispatch } from 'react-redux';
import NotificationPlate from 'components/NotificationPlate';
import Spinner from 'components/Spinner';

export default function CategoriesTree({
  onSelect,
  data,
  isFetching,
}: CategoriesTreeProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [onlyNotEmpty, setOnlyNotEmpty] = useState(false);

  const dispatch = useDispatch();

  const categoryTitle = data?.parentCategory?.title;

  const backClickHandler = () => {
    if (onSelect) onSelect(data?.parentCategory?.parentId || 0);
  };

  const hideMobileMenu = () => dispatch(setOpen(false));

  return (
    <>
      <Box sx={styles.headerContainer}>
        <Box sx={styles.headerSide}>
          <Box sx={styles.headerTitle}>
            {categoryTitle ? (
              <BackButton onClick={backClickHandler} />
            ) : (
              <IconButton
                sx={{ width: '40px', height: '40px', cursor: 'auto' }}
                disableRipple
              >
                <FolderIcon />
              </IconButton>
            )}
            <Typography variant="h3" color="secondary">
              {categoryTitle || (onlyNotEmpty ? 'Непустые' : 'Все категории')}
            </Typography>
          </Box>

          {!categoryTitle && (
            <Tooltip title="Показывать только НЕПУСТЫЕ категории">
              <Switch
                sx={{ ml: 1 }}
                checked={onlyNotEmpty}
                onChange={(e) => setOnlyNotEmpty(e.target.checked)}
              />
            </Tooltip>
          )}
        </Box>

        {isMobile && (
          <IconButton onClick={hideMobileMenu}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      {!isFetching && (
        <Box component={'ul'} sx={styles.listContainer}>
          {data?.list.length ? (
            data.list
              .filter((category) =>
                onlyNotEmpty
                  ? category._count.subCategories || category._count.items
                  : category,
              )
              .map((category) => (
                <TreeItem
                  key={category.id}
                  title={category.title}
                  onClick={() => {
                    if (onSelect) onSelect(category.id);
                  }}
                  count={{
                    subCategories: category._count.subCategories,
                    items: category._count.items,
                  }}
                />
              ))
          ) : (
            <Typography variant="h3" color="secondary" sx={{ mt: 2 }}>
              {`Нет вложенных категорий ${
                !data?.parentCategory?._count?.items ? 'и товаров' : ''
              }`}
            </Typography>
          )}
          {isMobile &&
            data?.parentCategory?.id === 0 &&
            !!data?.parentCategory?._count.items && (
              <NotificationPlate
                title="Закройте меню, чтобы увидеть товары"
                color="secondary"
                onClick={hideMobileMenu}
                sx={{ mt: 3, pl: 0.3, fontSize: 14, cursor: 'pointer' }}
              />
            )}
        </Box>
      )}
      {isFetching && <Spinner sx={{ mt: 3 }} />}
    </>
  );
}
