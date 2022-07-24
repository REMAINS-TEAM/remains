import { ReactNode } from 'react';

export interface HeaderProps {
  title: string;
  withBackButton?: boolean;
  onBackButtonClick?: () => void;
  left?: ReactNode;
  right?: ReactNode;
}
