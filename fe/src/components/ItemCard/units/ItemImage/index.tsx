import React, { useMemo } from 'react';
import * as styles from './styles';
import { Box } from '@mui/material';
import { HideImageOutlined as NoImageIcon } from '@mui/icons-material';
import ImageWithLoader from 'components/ImageWithLoader';

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
        <ImageWithLoader src={src} alt={'Изображение товара'} />
      ) : (
        <NoImageIcon />
      )}
    </Box>
  );
}

export default React.memo(ItemImage);
