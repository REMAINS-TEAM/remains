// initialize an empty api service that we'll inject endpoints into later as needed
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LS_KEY_TOKEN } from 'global/constants';

export const apiTypes = {
  ITEMS: 'items',
  CATEGORIES: 'categories',
  USERS: 'users',
  COMPANIES: 'companies',
  SEARCH: 'search',
  BRANDS: 'brands',
};

export default createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LS_KEY_TOKEN);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: Object.values(apiTypes),
  endpoints: () => ({}),
});
