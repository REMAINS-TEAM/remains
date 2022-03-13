import React from 'react';
import { Box } from '@mui/system';
import * as styles from 'pages/Items/styles';
import Carousel from 'react-material-ui-carousel';

function ImagesCarousel() {
  return (
    <Carousel navButtonsAlwaysVisible>
      <Box sx={styles.imageContainer}>
        <img
          style={{ height: '100%' }}
          src="https://images.pexels.com/photos/11319741/pexels-photo-11319741.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
      </Box>
      <Box sx={styles.imageContainer}>
        <img
          style={{ height: '100%' }}
          src="https://images.pexels.com/photos/3112898/pexels-photo-3112898.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
      </Box>
      <Box sx={styles.imageContainer}>
        <img
          style={{ height: '100%' }}
          src="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
      </Box>
    </Carousel>
  );
}

export default React.memo(ImagesCarousel);
