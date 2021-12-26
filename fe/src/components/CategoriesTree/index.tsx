import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CategoriesTreeType } from './types';
import React, { useEffect, useState } from 'react';
import categoriesApi from 'store/api/categories';
import { Category } from 'store/slices/categories';
import { RecursiveTreeItem } from 'components/CategoriesTree/units/RecursiveTreeItem';
import Skeleton from '@mui/material/Skeleton';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';

export default function CategoriesTree({
  initCategories,
  isLoading,
}: CategoriesTreeType) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<
    Record<number, Category[] | undefined>
  >({});
  const [currentId, setCurrentId] = useState<number | undefined>();
  const [expanded, setExpanded] = useState<string[]>([]);

  const { data, isFetching } = categoriesApi.useGetAllCategoriesQuery(
    { parentId: currentId },
    { skip: currentId === undefined },
  );

  // set level up categories (with parentId === 0)
  useEffect(() => {
    setCategories({ 0: initCategories });
  }, [initCategories]);

  // add loaded data to categories state
  useEffect(() => {
    if (currentId !== undefined && !isFetching) {
      setCategories((prev) => ({ ...prev, [currentId]: data }));
    }
  }, [data, isFetching, currentId]);

  // if new category is opened load data for it
  const handleToggle = (_: React.SyntheticEvent, nodeIds: string[]) => {
    if (nodeIds.length > expanded.length) {
      const newExpanded = nodeIds.find((e) => !expanded.includes(e));
      if (newExpanded) setCurrentId(+newExpanded);
    }

    setExpanded(nodeIds);
  };

  const handleSelect = (_: React.SyntheticEvent, categoryId: string) => {
    navigate(generatePath(routes.category, { categoryId }));
  };

  const getSubCategories = (id: number) => categories[id] || [];

  if (isLoading) {
    return (
      <>
        {Array.from(new Array(10)).map((_, i) => (
          <Skeleton key={i} sx={{ height: '40px' }} />
        ))}
      </>
    );
  }

  return (
    <TreeView
      aria-label="categories"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      expanded={expanded}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      sx={{ height: '100%', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {categories[0]?.map((category) => (
        <RecursiveTreeItem
          key={category.id}
          category={category}
          subCategories={getSubCategories(category.id)}
          getSubCategories={getSubCategories}
          isFetching={isFetching}
        />
      ))}
    </TreeView>
  );
}
