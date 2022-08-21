import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import * as styles from './styles';

const AppFooter = () => {
  return (
    <footer>
      <Box sx={styles.container}>
        <Grid container xs={12} spacing={1}>
          <Grid xs={3} sx={styles.links}>
            <Link to="/offer">Оферта</Link>
          </Grid>
          <Grid xs={9} sx={{ textAlign: 'right' }}>
            ИП Рязанов А.В. ОГРНИП: 322527500091022 Тел.: +7 (920) 025-92-22
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default AppFooter;
