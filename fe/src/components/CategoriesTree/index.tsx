import TreeView from '@mui/lab/TreeView';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TreeItem from './units/TreeItem';
import { CategoriesTreeType } from './types';
import { Skeleton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import categoriesApi from 'store/api/categories';
import { Category } from 'store/slices/categories';

export default function CategoriesTree({
  initCategories,
  isLoading,
}: CategoriesTreeType) {
  const [currentId, setCurrentId] = useState<number | undefined>();
  const [expanded, setExpanded] = useState<string[]>([]);

  const { data } = categoriesApi.useGetAllCategoriesQuery(
    { parentId: currentId },
    { skip: currentId === undefined },
  );

  const [categories, setCategories] = useState<
    Record<number, Category[] | undefined>
  >({});

  useEffect(() => {
    setCategories({
      0: initCategories,
    });
  }, [initCategories]);

  useEffect(() => {
    if (currentId !== undefined) {
      setCategories((prev) => ({ ...prev, [currentId]: data }));
      setExpanded((prev) => [...prev, String(currentId)]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        {Array.from(new Array(10)).map((_, i) => (
          <Skeleton key={i} sx={{ height: '40px' }} />
        ))}
      </>
    );
  }

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  function RecursiveTreeItem({
    category,
    subCategories,
  }: {
    category: Category;
    subCategories: Category[] | undefined;
  }) {
    return (
      <TreeItem
        nodeId={String(category.id)}
        labelText={category.title}
        labelIcon={SupervisorAccountIcon}
        labelInfo={String(0)}
        color="#1a73e8"
        bgColor="#e8f0fe"
        onClick={() => setCurrentId(category.id)}
      >
        {subCategories?.length
          ? subCategories.map((sub) => (
              <RecursiveTreeItem
                category={sub}
                subCategories={categories[sub.id]}
                key={sub.id}
              />
            ))
          : null}
      </TreeItem>
    );
  }

  return (
    <TreeView
      aria-label="categories"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      expanded={expanded}
      onNodeToggle={handleToggle}
      sx={{ height: '100%', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {categories[0] &&
        categories[0].map((category) => (
          <RecursiveTreeItem
            key={category.id}
            category={category}
            subCategories={categories[category.id]}
          />
        ))}
    </TreeView>
  );
}
