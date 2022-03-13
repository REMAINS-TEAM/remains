import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Carousel from 'react-material-ui-carousel';
import * as styles from './styles';
import { Box } from '@mui/system';
import Container from 'components/Container';
import itemsApi from 'store/api/items';
import BackButton from 'components/BackButton';
import DetailsTable from 'pages/Items/units/DetailsTable';
import ImagesCarousel from 'pages/Items/units/Carousel';

function ItemPage() {
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
          <ImagesCarousel />
          <DetailsTable item={item} />
        </Container>
      </Box>
    </MainLayout>
  );
}

export default ItemPage;
