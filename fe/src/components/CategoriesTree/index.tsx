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
import { RecursiveTreeItem } from 'components/CategoriesTree/units/RecursiveTreeItem';

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

  // TODO: показывать внутри каждой категории
  // if (isLoading) {
  //   return (
  //     <>
  //       {Array.from(new Array(10)).map((_, i) => (
  //         <Skeleton key={i} sx={{ height: '40px' }} />
  //       ))}
  //     </>
  //   );
  // }

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
        />
      ))}
    </TreeView>
  );
}
