import { TreeItemProps } from './types';
import React from 'react';
import { FolderOutlined as FolderIcon } from '@mui/icons-material';
import * as styles from './styles';
import { Box } from '@mui/material';

export default function TreeItem({ title, onClick }: TreeItemProps) {
  return (
    <li onClick={onClick} style={{ listStyle: 'none' }}>
      <Box sx={styles.itemContainer}>
        <Box sx={styles.titleContainer}>
          <FolderIcon />
          <span>{title}</span>
        </Box>

        {/*<Tooltip*/}
        {/*  title={*/}
        {/*    !count.items && !count.subCategories*/}
        {/*      ? 'Здесь пусто'*/}
        {/*      : `Элементов ${count.items}, подкатегорий ${count.subCategories}`*/}
        {/*  }*/}
        {/*>*/}
        {/*  <span>*/}
        {/*    {count.items}/{count.subCategories}*/}
        {/*  </span>*/}
        {/*</Tooltip>*/}
      </Box>
    </li>
  );
}
