import React from 'react';
import { Box, SxProps } from '@mui/system';
import * as styles from './styles';
import Carousel from 'react-material-ui-carousel';

function ImagesCarousel({
  itemId,
  images,
}: {
  itemId: number;
  images: string[];
}) {
  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible
      // fullHeightHover={false}
      animation="slide"
      navButtonsAlwaysInvisible={images.length < 2}
      sx={styles.carousel}
    >
      {images.map((fileName) => (
        <Box key={fileName} sx={styles.imageContainer as SxProps}>
          <img
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
            src={`/api/storage/items/${itemId}/${fileName}`}
            alt={`${fileName}`}
          />
        </Box>
      ))}
    </Carousel>
  );
}

export default React.memo(ImagesCarousel);
