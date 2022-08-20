import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';

export const imageContainer: SxProps = {
  position: 'relative',
  height: 135,
  width: 135,
  minWidth: '135px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  overflow: 'hidden',

  '@media screen and (max-width: 600px)': {
    width: 260,
    height: 260,
  },
};

export const image: CSSProperties = {
  height: '100%',
};
