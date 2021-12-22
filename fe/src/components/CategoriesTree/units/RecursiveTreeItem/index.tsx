import { Category } from 'store/slices/categories';
import TreeItem from 'components/CategoriesTree/units/TreeItem';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import React from 'react';

export function RecursiveTreeItem({
  category,
  subCategories,
  getSubCategories,
  onClick,
}: {
  category: Category;
  subCategories: Category[] | undefined;
  getSubCategories: (id: number) => Category[];
  onClick: (id: number) => void;
}) {
  return (
    <TreeItem
      nodeId={String(category.id)}
      labelText={category.title}
      labelIcon={SupervisorAccountIcon}
      labelInfo={String(category.countSubCategories || 0)}
      color="#1a73e8"
      bgColor="#e8f0fe"
      onClick={() => onClick(category.id)}
    >
      {subCategories?.length
        ? subCategories.map((sub) => (
            <RecursiveTreeItem
              category={sub}
              subCategories={getSubCategories(sub.id)}
              getSubCategories={getSubCategories}
              onClick={onClick}
              key={sub.id}
            />
          ))
        : null}
    </TreeItem>
  );
}
