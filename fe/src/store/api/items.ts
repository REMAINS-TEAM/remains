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
    createItem: build.mutation<
      Item,
      {
        title: string;
        description: string;
        price: number;
        categoryId: number;
        images: string[];
      }
    >({
      query: (body) => ({
        url: `items`,
        method: 'post',
        body,
      }),
    }),
  }),
});

export default itemsApi;
