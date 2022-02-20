import React, { useState } from 'react';
import * as styles from 'components/ItemCard/units/ItemImage/styles';
import {
  AddPhotoAlternate as AddImageIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

function UploadedImage({
  src,
  onAdd,
}: {
  src?: string;
  onAdd?: (file: File) => void;
}) {
  const [hover, setHover] = useState(false);

  const selectImageHandler = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      if (file && onAdd) {
        onAdd(file);
      }
    };

    input.click();
  };

  if (!src)
    return (
      <Box sx={styles.imageContainer}>
        <IconButton color="secondary" onClick={selectImageHandler}>
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
