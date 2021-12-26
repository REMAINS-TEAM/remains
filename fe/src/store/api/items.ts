import api from './';
import { Item } from '../slices/items';
import { getQueryString } from 'utils';

export const itemsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategoryItems: build.query<
      Item[],
      Record<string, string | number | undefined> | void
    >({
      query: (params) => `items` + getQueryString(params),
    }),
  }),
});

export default itemsApi;
