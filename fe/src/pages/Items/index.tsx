import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Carousel from 'react-material-ui-carousel';
import * as styles from './styles';
import { Box } from '@mui/system';
import Container from 'components/Container';
import itemsApi from 'store/api/items';
import BackButton from 'components/BackButton';

function ItemsPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { data: item, isLoading } = itemsApi.useGetItemByIdQuery(
    +(itemId || ''),
    { skip: !itemId },
  );

  if (isLoading) return <MainLayout>Loading...</MainLayout>;

  if (!item) return null;

  const backClickHandler = () => navigate(-1);

  return (
    <MainLayout>
      <Box sx={styles.page}>
        <Box sx={styles.title}>
          <BackButton onClick={backClickHandler} />
          <h2>{item.title}</h2>
        </Box>

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

export default ItemsPage;
