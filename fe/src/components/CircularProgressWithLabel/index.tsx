import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ReactNode, useMemo } from 'react';

export default function CircularProgressWithLabel({
  label,
  ...props
}: CircularProgressProps & { label: ReactNode }) {
  const color = useMemo(() => {
    if (!props.value) return 'primary';
    if (props.value > 50) return 'success';
    if (props.value > 25) return 'warning';
    return 'error';
  }, [props.value]);

  if (props.value === undefined) return null;

  return (
    <Box
      sx={{ position: 'relative', userSelect: 'none', width: 40, height: 40 }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[800],
          opacity: '0.2',
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          position: 'absolute',
          left: 0,
        }}
        size={40}
        thickness={4}
        {...props}
        color={color}
        value={props.value < 0 ? 0 : props.value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color={'white'}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
}
