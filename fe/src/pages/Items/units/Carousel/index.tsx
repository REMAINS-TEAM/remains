import React from 'react';
import { Box } from '@mui/system';
import * as styles from './styles';
import Carousel from 'react-material-ui-carousel';
import { BACKEND_URL } from 'global/constants';

function ImagesCarousel({
  itemId,
  images,
}: {
  itemId: number;
  images: string[];
}) {
  return (
    <Carousel
      navButtonsAlwaysVisible
      fullHeightHover={false}
      animation="slide"
      sx={styles.carousel}
    >
      {images.map((fileName) => (
        <Box key={fileName} sx={styles.imageContainer}>
          <img
            style={{ width: '100%' }}
            src={`${BACKEND_URL}/content/items/${itemId}/${fileName}`}
            alt={`${fileName}`}
          />
        </Box>
      ))}
    </Carousel>
  );
}

export default React.memo(ImagesCarousel);
