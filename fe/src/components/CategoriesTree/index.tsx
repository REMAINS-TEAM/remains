import React, { useEffect, useState } from 'react';
import categoriesApi from 'store/api/categories';
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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import TreeItem from './units/TreeItem';
import { CategoriesTreeProps } from './types';
import { useParams } from 'react-router-dom';
import { setOpen } from 'store/slices/menu';
import { useDispatch } from 'react-redux';

export default function CategoriesTree({ onSelect }: CategoriesTreeProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [onlyNotEmpty, setOnlyNotEmpty] = useState(false);

  const { categoryId } = useParams();

  const dispatch = useDispatch();

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryId ? +categoryId : 0,
  );

  useEffect(() => {
    setSelectedCategoryId(categoryId ? +categoryId : 0);
  }, [categoryId]);

  const { data, isFetching } = categoriesApi.useGetAllQuery({
    parentId: selectedCategoryId,
  });

  const categoryTitle = data?.parentCategory?.title;

  const backClickHandler = () =>
    setSelectedCategoryId(data?.parentCategory?.parentId || 0);

  useEffect(() => {
    if (onSelect && data) onSelect(data.tree);
  }, [data]);

  const hideMobileMenu = () => dispatch(setOpen(false));

  return (
    <>
      <Box sx={styles.headerContainer}>
        <Box sx={styles.headerSide}>
          <Box sx={styles.headerTitle}>
            {categoryTitle ? (
              <BackButton onClick={backClickHandler} />
            ) : (
              <IconButton sx={{ width: '40px', height: '40px' }}>
                <FolderIcon />
              </IconButton>
            )}
            <Typography variant="h3" color="secondary">
              {categoryTitle || (onlyNotEmpty ? 'Непустые' : 'Все категории')}
            </Typography>
          </Box>

          {!categoryTitle && (
            <Switch
              sx={{ ml: 1 }}
              checked={onlyNotEmpty}
              onChange={(e) => setOnlyNotEmpty(e.target.checked)}
            />
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
            data.list.map((category) => (
              <TreeItem
                key={category.id}
                title={category.title}
                onClick={() => setSelectedCategoryId(category.id)}
                count={{
                  subCategories: category._count.subCategories,
                  items: category._count.items,
                }}
              />
            ))
          ) : (
            <Typography variant="h3" color="secondary" sx={{ mt: 2 }}>
              Нет вложенных категорий
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}
