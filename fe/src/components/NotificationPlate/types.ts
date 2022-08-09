import { Palette, SxProps, Theme } from '@mui/material';

export interface NotificationPlateProps {
  title: string;
  color?: keyof Palette;
  sx?: SxProps<Theme>;
}
