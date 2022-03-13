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
import ItemsPage from 'pages/Items';

export const history = createBrowserHistory();

export default function MainNavigation() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Box sx={{ mt: `${APP_HEADER_HEIGHT}px` }}>
        <Routes>
          <Route path={routes.main} element={<CategoriesPage />} />
          <Route path={routes.category} element={<CategoriesPage />} />
          <Route path={routes.item} element={<ItemsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <MainNotification />
    </BrowserRouter>
  );
}
