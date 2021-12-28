import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import AppHeader from 'components/AppHeader';
import routes from 'routes';
import NotFoundPage from 'pages/NotFoundPage';
import Categories from 'pages/Categories';

export const history = createBrowserHistory();

export default function MainNavigation() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path={routes.main} element={<Categories />} />
        <Route path={routes.category} element={<Categories />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
