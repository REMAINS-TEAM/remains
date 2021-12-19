import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import AppHeader from 'components/AppHeader';
import routes from 'routes';
import MainPage from 'pages/MainPage';
import NotFoundPage from 'pages/NotFoundPage';

export const history = createBrowserHistory();

export default function MainNavigation() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path={routes.main} element={<MainPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
