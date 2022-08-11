import { TreeItemProps } from './types';
import React from 'react';
import { FolderOutlined as FolderIcon } from '@mui/icons-material';
import * as styles from './styles';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';

export default function TreeItem({ title, count, onClick }: TreeItemProps) {
  const theme = useTheme();
  return (
    <li onClick={onClick} style={{ listStyle: 'none' }}>
      <Box sx={styles.itemContainer}>
        <Box sx={styles.titleContainer}>
          <FolderIcon />
          <span>{title}</span>
        </Box>

        {!count.items && !count.subCategories && (
          <Tooltip title="Внутри ничего нет (0 товаров / 0 категорий)">
            <Typography
              variant="subtitle1"
              color={theme.palette.grey[300]}
              component="span"
            >
              —
            </Typography>
          </Tooltip>
        )}
      </Box>
    </li>
  );
}
