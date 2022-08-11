import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import AppHeader from 'components/AppHeader';
import routes from 'routes';
import NotFoundPage from 'pages/NotFoundPage';
import CategoriesPage from 'pages/Categories';
import { Box } from '@mui/material';
import { APP_HEADER_HEIGHT } from 'global/constants';
import MainNotification from 'components/MainNotification';
import ItemPage from 'pages/Item';
import ProfilePage from 'pages/ProfilePage';
import ItemsPage from 'pages/items';

export const history = createBrowserHistory();

export default function MainNavigation() {
  return (
    <BrowserRouter>
      <AppHeader />
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    width: '100%',*/}
      {/*    height: '200px',*/}
      {/*    // mt: `${APP_HEADER_HEIGHT}px`,*/}
      {/*    mt: `-140px`,*/}
      {/*    backgroundColor: 'blue',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  TODO: Тут будет всплывающий drawer для фильтров*/}
      {/*</Box>*/}
      <Box sx={{ mt: `${APP_HEADER_HEIGHT}px` }}>
        <Routes>
          <Route path={routes.main} element={<CategoriesPage />} />
          <Route path={routes.category} element={<CategoriesPage />} />
          <Route path={routes.item} element={<ItemPage />} />
          <Route path={routes.items} element={<ItemsPage />} />
          <Route path={routes.profile} element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <MainNotification />
    </BrowserRouter>
  );
}
