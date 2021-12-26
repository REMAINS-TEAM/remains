import React from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import { HideImage } from '@mui/icons-material';

function ItemImage({ src }: { src?: string }) {
  return (
    <Box sx={styles.imageContainer}>
      {src ? (
        <img src={src} alt={'Изображение товара'} style={styles.image} />
      ) : (
        <HideImage />
      )}
    </Box>
  );
}

export default React.memo(ItemImage);
