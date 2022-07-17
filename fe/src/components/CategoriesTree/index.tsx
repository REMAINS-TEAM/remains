import React, { useEffect, useState } from 'react';
import categoriesApi from 'store/api/categories';
import * as styles from './styles';
import BackButton from 'components/BackButton';
import { AccountTreeOutlined as FolderIcon } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import TreeItem from './units/TreeItem';
import { CategoriesTreeProps } from './types';
import { useParams } from 'react-router-dom';

export default function CategoriesTree({ onSelect }: CategoriesTreeProps) {
  const { categoryId } = useParams();

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryId ? +categoryId : 0,
  );

  useEffect(() => {
    setSelectedCategoryId(categoryId ? +categoryId : 0);
  }, [categoryId]);

  const { data, isFetching } = categoriesApi.useGetAllCategoriesQuery({
    parentId: selectedCategoryId,
  });

  const categoryTitle = data?.parentCategory?.title;

  const backClickHandler = () =>
    setSelectedCategoryId(data?.parentCategory?.parentId || 0);

  useEffect(() => {
    if (onSelect && data) onSelect(data.tree);
  }, [data]);

  return (
    <>
      <Box sx={styles.headerContainer}>
        {categoryTitle ? (
          <BackButton onClick={backClickHandler} />
        ) : (
          <IconButton sx={{ width: '40px', height: '40px' }}>
            <FolderIcon />
          </IconButton>
        )}
        <Typography variant="h3" color="secondary">
          {categoryTitle || 'Все'}
        </Typography>
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
