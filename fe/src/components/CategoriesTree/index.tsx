import React, { useState } from 'react';
import categoriesApi from 'store/api/categories';
import * as styles from './styles';
import BackButton from 'components/BackButton';
import { AccountTreeOutlined as FolderIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

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
      <ul>
        {categories?.map((category) => (
          <li
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </>
  );
}
