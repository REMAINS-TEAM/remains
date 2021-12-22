import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CategoriesTreeType } from './types';
import React, { useEffect, useState } from 'react';
import categoriesApi from 'store/api/categories';
import { Category } from 'store/slices/categories';
import { RecursiveTreeItem } from 'components/CategoriesTree/units/RecursiveTreeItem';
import { Skeleton } from '@mui/lab';

//TODO: починить повторное раскрытие

export default function CategoriesTree({
  initCategories,
  isLoading,
}: CategoriesTreeType) {
  const [categories, setCategories] = useState<
    Record<number, Category[] | undefined>
  >({});
  const [currentId, setCurrentId] = useState<number | undefined>();
  const [expanded, setExpanded] = useState<string[]>([]);

  const { data, isFetching } = categoriesApi.useGetAllCategoriesQuery(
    { parentId: currentId },
    { skip: currentId === undefined },
  );

  useEffect(() => {
    setCategories({ 0: initCategories });
  }, [initCategories]);

  useEffect(() => {
    if (currentId !== undefined && !isFetching) {
      setCategories((prev) => ({ ...prev, [currentId]: data }));
      setExpanded((prev) => [...prev, String(currentId)]);
    }
  }, [data, isFetching, currentId]);

  if (isLoading) {
    return (
      <>
        {Array.from(new Array(10)).map((_, i) => (
          <Skeleton key={i} sx={{ height: '40px' }} />
        ))}
      </>
    );
  }

  const handleToggle = (_: React.SyntheticEvent, nodeIds: string[]) =>
    setExpanded(nodeIds);

  const getSubCategories = (id: number) => categories[id] || [];

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
      {categories[0]?.map((category) => (
        <RecursiveTreeItem
          key={category.id}
          category={category}
          subCategories={getSubCategories(category.id)}
          getSubCategories={getSubCategories}
          onClick={setCurrentId}
          isFetching={isFetching}
        />
      ))}
    </TreeView>
  );
}
