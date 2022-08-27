import React, { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface ContainerProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  sx?: SxProps<Theme>;
}
