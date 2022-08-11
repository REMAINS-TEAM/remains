import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box } from '@mui/system';
import Container from 'components/Container';
import itemsApi from 'store/api/items';
import DetailsTable from 'pages/Item/units/DetailsTable';
import ImagesCarousel from 'pages/Item/units/Carousel';
import ItemEditPopupMenu from 'components/PopupMenus/ItemEditPopupMenu';
import { useSelector } from 'react-redux';
import { getCurrentUser, getPaidStatus } from 'store/selectors/user';
import Header from 'components/Header';

function ItemPage() {
  const { itemId } = useParams();

  const user = useSelector(getCurrentUser);
  const isPaid = useSelector(getPaidStatus);

  const { data: item, isLoading } = itemsApi.useGetItemByIdQuery(
    +(itemId || ''),
    { skip: !itemId },
  );

  if (isLoading) return <MainLayout>Loading...</MainLayout>;

  if (!item) return null;

  return (
    <MainLayout>
      <Box sx={styles.page}>
        <Header
          withBackButton
          title={item.title}
          right={
            item.userId === user?.id &&
            isPaid && <ItemEditPopupMenu item={item} />
          }
        />

        <Container sx={styles.container}>
          <ImagesCarousel itemId={item.id} images={item.images} />
          <DetailsTable item={item} />
        </Container>
      </Box>
    </MainLayout>
  );
}

export default ItemPage;
