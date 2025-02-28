import { createBrowserHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import routes from 'routes';
import NotFoundPage from 'pages/NotFoundPage';
import CategoriesPage from 'pages/Categories';
import ItemPage from 'pages/Item';
import ProfilePage from 'pages/ProfilePage';
import ItemsPage from 'pages/items';
import PaymentSuccessPage from 'pages/Payment/Success';
import OfferPage from 'pages/Offer';
import WelcomePage from 'pages/Welcome';
import CompanyPage from 'pages/Company';

export const history = createBrowserHistory();

export default function MainNavigation() {
  return (
    <Routes>
      <Route path={routes.main} element={<CategoriesPage />} />
      <Route path={routes.category} element={<CategoriesPage />} />
      <Route path={routes.item} element={<ItemPage />} />
      <Route path={routes.items} element={<ItemsPage />} />
      <Route path={routes.company} element={<CompanyPage />} />
      <Route path={routes.profile} element={<ProfilePage />} />
      <Route path={routes.payment.success} element={<PaymentSuccessPage />} />
      <Route path={routes.offer} element={<OfferPage />} />
      <Route path={routes.welcome} element={<WelcomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
