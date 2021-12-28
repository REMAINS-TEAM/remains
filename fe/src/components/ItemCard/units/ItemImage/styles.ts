import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';

export const imageContainer: SxProps = {
  position: 'relative',
  height: '150px',
  width: '150px',
  minWidth: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  overflow: 'hidden',
  boxShadow: '0 1px 2px #ccc',
};

export const image: CSSProperties = {
  height: '100%',
};

export const overlay: SxProps = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 99,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
  userSelect: 'none',
  '&:active': {
    '&>*': {
      transform: 'scale(0.9)',
    },
  },
};
