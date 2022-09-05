import { Palette, SxProps, Theme } from '@mui/material';
import React from 'react';

export interface NotificationPlateProps {
  title: string;
  color?: keyof Palette;
  sx?: SxProps<Theme>;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
