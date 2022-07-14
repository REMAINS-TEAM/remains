import React, { useState } from 'react';
import categoriesApi from 'store/api/categories';
import * as styles from './styles';
import BackButton from 'components/BackButton';
import { AccountTreeOutlined as FolderIcon } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import TreeItem from './units/TreeItem';

export default function CategoriesTree() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const { data: categories } = categoriesApi.useGetAllCategoriesQuery({
    parentId: selectedCategoryId,
  });

  const categoryTitle = categories?.[0]?.parentCategory?.title;
  const backClickHandler = () =>
    setSelectedCategoryId(categories?.[0]?.parentCategory?.parentId || 0);

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
      <Box component={'ul'} sx={styles.listContainer}>
        {categories?.map((category) => (
          <TreeItem
            key={category.id}
            title={category.title}
            onClick={() => setSelectedCategoryId(category.id)}
            count={{
              subCategories: category._count.subCategories,
              items: category._count.items,
            }}
          />
        ))}
      </Box>
    </>
  );
}
