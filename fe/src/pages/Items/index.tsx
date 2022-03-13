import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Carousel from 'react-material-ui-carousel';
import * as styles from './styles';
import { Box } from '@mui/system';
import Container from 'components/Container';

function ItemsPage() {
  const { itemId } = useParams();

  return (
    <MainLayout>
      <Box sx={styles.page}>
        <h2>Название товара</h2>
        <Container sx={styles.container}>
          <Carousel sx={styles.column} navButtonsAlwaysVisible>
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
          <Box sx={styles.column}>desc</Box>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default React.memo(ItemsPage);
