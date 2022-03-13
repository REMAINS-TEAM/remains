import React from 'react';
import { Box } from '@mui/system';
import * as styles from 'pages/Items/styles';
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
    <Carousel navButtonsAlwaysVisible>
      {images.map((fileName) => (
        <Box key={fileName} sx={styles.imageContainer}>
          <img
            style={{ height: '100%' }}
            src={`${BACKEND_URL}/content/items/${itemId}/${fileName}`}
            alt={`${fileName}`}
          />
        </Box>
      ))}
    </Carousel>
  );
}

export default React.memo(ImagesCarousel);
