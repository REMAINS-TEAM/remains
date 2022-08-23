import React from 'react';
import * as styles from './styles';
import Container from 'components/Container';
import { Item } from 'store/slices/items';
import ItemImage from 'components/ItemCard/units/ItemImage';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getCurrentUser, getPaidStatus } from 'store/selectors/user';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import ItemEditPopupMenu from 'components/PopupMenus/ItemEditPopupMenu';
import { standardFormat } from 'utils';
import Grid from '@mui/material/Unstable_Grid2';

function ItemCard({ item }: { item: Item }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);
  const isPaid = useSelector(getPaidStatus);

  const itemDetailsClickHandler = () => {
    navigate(generatePath(routes.item, { itemId: String(item.id) }));
  };

  return (
    <Container sx={styles.itemContainer} onClick={itemDetailsClickHandler}>
      {item.userId === user?.id && isPaid && (
        <ItemEditPopupMenu item={item} sx={styles.dotsButton} />
      )}
      <Grid container columnSpacing={2} rowSpacing={6} xs={13}>
        <Grid sm="auto" xs={12} sx={{ alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ItemImage
              src={`/api/storage/items/${item.id}/${item.images[0]}`}
            />
          </Box>
        </Grid>
        <Grid container sm xs={12}>
          <Grid sm={9} xs={8}>
            <Typography
              variant="body1"
              component={'h3'}
              sx={{
                mb: 1,
                // whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" color={'secondary'}>
              {item.description}
            </Typography>
          </Grid>
          <Grid sm={3} xs={4}>
            <Box sx={styles.rightSide}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'inherit',
                    lineHeight: 0.5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.price.toLocaleString('ru')} ₽
                </Typography>
                <br />
                {!isMobile && (
                  <Button
                    aria-controls="details"
                    variant="outlined"
                    size={'small'}
                    onClick={itemDetailsClickHandler}
                  >
                    Подробнее
                  </Button>
                )}
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="secondary"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {standardFormat(item.updatedAt, true)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default React.memo(ItemCard);
