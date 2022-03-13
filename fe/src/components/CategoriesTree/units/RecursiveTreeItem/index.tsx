import { Category } from 'store/slices/categories';
import TreeItem from 'components/CategoriesTree/units/TreeItem';
import {
  FolderOutlined as OneIcon,
  Folder as ManyIcon,
} from '@mui/icons-material';
import React from 'react';
import { Skeleton } from '@mui/lab';
import { useTheme } from '@mui/material';

export function RecursiveTreeItem({
  category,
  subCategories,
  getSubCategories,
  isFetching,
}: {
  category: Category;
  subCategories: Category[] | undefined;
  getSubCategories: (id: number) => Category[];
  isFetching: boolean;
}) {
  const theme = useTheme();

  return (
    <TreeItem
      nodeId={String(category.id)}
      labelText={category.title}
      labelIcon={category.countSubCategories ? ManyIcon : OneIcon}
      labelInfo={String(category.itemsCount || '')}
      color={theme.palette.getContrastText(theme.palette.primary.main)}
      bgColor={theme.palette.primary.main}
      title={category.description}
    >
      {!subCategories?.length && isFetching && !!category.countSubCategories && (
        <>
          {Array.from(new Array(category.countSubCategories)).map((_, i) => (
            <Skeleton key={i} sx={{ height: '32px', marginLeft: 2 }} />
          ))}
        </>
      )}
      {!!subCategories?.length &&
        subCategories.map((sub) => (
          <RecursiveTreeItem
            category={sub}
            subCategories={getSubCategories(sub.id)}
            getSubCategories={getSubCategories}
            isFetching={isFetching}
            key={sub.id}
          />
        ))}
    </TreeItem>
  );
}
