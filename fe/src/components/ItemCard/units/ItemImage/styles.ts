import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';

export const imageContainer: SxProps = {
  position: 'relative',
  height: '135px',
  width: '135px',
  minWidth: '135px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  overflow: 'hidden',
};

export const image: CSSProperties = {
  height: '100%',
};
