import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import * as styles from './styles';
import { Box } from '@mui/system';
import itemsApi from 'store/api/items';
import DetailsTable from 'pages/Item/units/DetailsTable';
import ImagesCarousel from 'pages/Item/units/Carousel';
import ItemEditPopupMenu from 'components/PopupMenus/ItemEditPopupMenu';
import { useSelector } from 'react-redux';
import {
  getCurrentUser,
  getIsAdmin,
  getPaidStatus,
} from 'store/selectors/user';
import Header from 'components/Header';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';

function ItemPage() {
  const { itemId } = useParams();

  const user = useSelector(getCurrentUser);
  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

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
            ((item.userId === user?.id && isPaid) || isAdmin) && (
              <ItemEditPopupMenu item={item} />
            )
          }
        />

        <Paper sx={styles.paper}>
          <Grid container xs={12} spacing={2} sx={{ height: '100%' }}>
            <Grid xs={12} sm={6} sx={{ height: '100%' }}>
              <ImagesCarousel itemId={item.id} images={item.images} />
            </Grid>
            <Grid xs={12} sm={6} sx={{ height: '100%' }}>
              <DetailsTable item={item} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default ItemPage;
