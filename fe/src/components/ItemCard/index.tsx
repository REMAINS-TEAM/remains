import React, { useRef } from 'react';
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
import {
  getCurrentUser,
  getIsAdmin,
  getPaidStatus,
} from 'store/selectors/user';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import ItemEditPopupMenu from 'components/PopupMenus/ItemEditPopupMenu';
import { standardFormat } from 'utils';
import Grid from '@mui/material/Unstable_Grid2';

function ItemCard({ item }: { item: Item }) {
  const cardRef = useRef<HTMLElement | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);
  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const itemClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (cardRef.current?.contains(event.target as Node)) {
      navigate(generatePath(routes.item, { itemId: String(item.id) }));
    }
  };

  return (
    <Container
      ref={cardRef}
      sx={styles.itemContainer}
      onClick={itemClickHandler}
    >
      {((item.userId === user?.id && isPaid) || isAdmin) && (
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
                  variant="h2"
                  component="div"
                  sx={{
                    fontFamily: 'inherit',
                    lineHeight: 0.6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.price.toLocaleString('ru')} ₽
                </Typography>
                {!isMobile && (
                  <Button
                    sx={{ my: 2 }}
                    aria-controls="details"
                    variant="outlined"
                    size={'small'}
                    onClick={itemClickHandler}
                  >
                    Подробнее
                  </Button>
                )}
              </Box>
              <Box display="flex" flexDirection="column" sx={{ mt: 1 }}>
                {item.brand && (
                  <Typography
                    variant="caption"
                    color="secondary"
                    sx={{ whiteSpace: 'nowrap', lineHeight: 3 }}
                  >
                    {item.brand?.title}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="secondary"
                  sx={{ whiteSpace: 'nowrap', lineHeight: 0.5 }}
                >
                  {standardFormat(item.updatedAt)}
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
