import { TreeItemProps } from './types';
import React from 'react';
import {
  FolderCopyOutlined as FolderWithFoldersIcon,
  FolderOutlined as FolderIcon,
} from '@mui/icons-material';
import * as styles from './styles';
import { Box } from '@mui/material';

export default function TreeItem({ title, count, onClick }: TreeItemProps) {
  return (
    <li onClick={onClick} style={{ listStyle: 'none' }}>
      <Box sx={styles.itemContainer}>
        <Box sx={styles.titleContainer}>
          {count.subCategories ? <FolderWithFoldersIcon /> : <FolderIcon />}
          <span>{title}</span>
        </Box>
      </Box>
    </li>
  );
}
