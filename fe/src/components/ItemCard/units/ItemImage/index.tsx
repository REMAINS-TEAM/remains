import React from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import { HideImage } from '@mui/icons-material';

function ItemImage({
  src,
  withBorder = false,
}: {
  src?: string;
  withBorder?: boolean;
}) {
  return (
    <Box
      sx={{
        ...styles.imageContainer,
        boxShadow: withBorder ? '0 1px 2px #ccc' : undefined,
      }}
    >
      {src ? (
        <img src={src} alt={'Изображение товара'} style={styles.image} />
      ) : (
        <HideImage />
      )}
    </Box>
  );
}

export default React.memo(ItemImage);
