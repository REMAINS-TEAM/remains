import { Category } from 'store/slices/categories';
import TreeItem from 'components/CategoriesTree/units/TreeItem';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import React from 'react';
import { Skeleton } from '@mui/lab';

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
  return (
    <TreeItem
      nodeId={String(category.id)}
      labelText={category.title}
      labelIcon={SupervisorAccountIcon}
      labelInfo={String(category.countSubCategories || 0)}
      color="#1a73e8"
      bgColor="#e8f0fe"
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
