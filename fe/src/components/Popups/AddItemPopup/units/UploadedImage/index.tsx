import React, { useState } from 'react';
import * as styles from 'components/ItemCard/units/ItemImage/styles';
import {
  AddPhotoAlternate as AddImageIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

function UploadedImage({ src }: { src?: string }) {
  const [hover, setHover] = useState(false);
  if (!src)
    return (
      <Box sx={styles.imageContainer}>
        <IconButton color="secondary">
          <AddImageIcon />
        </IconButton>
      </Box>
    );

  const mouseEnterHandler = () => setHover(true);
  const mouseLeaveHandler = () => setHover(false);

  return (
    <Box
      sx={styles.imageContainer}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <img src={src} alt={'Изображение товара'} style={styles.image} />

      {hover && (
        <Box sx={styles.overlay} onClick={() => console.log('click')}>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default React.memo(UploadedImage);
