import { SxProps } from '@mui/system';

export const rootContainer: SxProps = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 1,
  alignItems: 'center',
  minHeight: '90px',
  justifyContent: 'space-around',
  padding: 2,
  margin: 0,
  textAlign: 'center',
};
