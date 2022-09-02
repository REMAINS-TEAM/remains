import React, { useMemo } from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import { HideImageOutlined as NoImageIcon } from '@mui/icons-material';

function ItemImage({
  src,
  withBorder = false,
}: {
  src?: string;
  withBorder?: boolean;
}) {
  const fileExtension = useMemo(() => {
    const fileName = src?.split('/').pop();
    if (!fileName?.includes('.')) return undefined;
    return fileName?.split('.').pop();
  }, [src]);

  return (
    <Box
      sx={{
        ...styles.imageContainer,
        boxShadow: withBorder ? '0 1px 2px #ccc' : undefined,
      }}
    >
      {src && fileExtension ? (
        <img src={src} alt={'Изображение товара'} style={styles.image} />
      ) : (
        <NoImageIcon />
      )}
    </Box>
  );
}

export default React.memo(ItemImage);
