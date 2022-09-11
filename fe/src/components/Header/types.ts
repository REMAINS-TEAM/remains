import { ReactNode } from 'react';
import { SxProps } from '@mui/system';

export interface HeaderProps {
  title: string;
  withBackButton?: boolean;
  onBackButtonClick?: () => void;
  left?: ReactNode;
  right?: ReactNode;
  sx?: SxProps;
}
