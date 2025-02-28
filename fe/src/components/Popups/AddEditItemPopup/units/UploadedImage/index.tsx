import React, { useEffect, useState } from 'react';
import * as styles from './styles';
import {
  AddPhotoAlternate as AddImageIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { fileToDataUri } from 'utils';

function UploadedImage({
  src,
  file,
  onAdd,
  onDelete,
}: {
  src?: string;
  file?: File;
  onAdd?: (file: File) => void;
  onDelete?: (file: File | string) => void;
}) {
  const [hover, setHover] = useState(false);
  const [dataUri, setDataUri] = useState('');

  useEffect(() => {
    (async () => {
      if (!file) return;
      const data = await fileToDataUri(file);
      setDataUri(data);
    })();
  }, [file]);

  const selectImageHandler = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png';

    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      if (file && onAdd) {
        onAdd(file);
      }
    };

    input.click();
  };

  if (!file && !src)
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
      onMouseMove={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <img
        src={dataUri || src}
        alt={'Изображение товара'}
        style={styles.image}
      />

      {hover && (
        <Box
          sx={styles.overlay}
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete((file as File) || (src as string));
          }}
        >
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default React.memo(UploadedImage);
