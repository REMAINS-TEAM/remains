import api from './';
import { Item } from '../slices/items';
import { getQueryString } from 'utils';
import { deleteById } from 'store/slices/items';

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
        price: string;
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
    deleteItem: build.mutation<Item, number>({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        const deleteResponse = await fetchWithBQ({
          url: `items/${id}`,
          method: 'DELETE',
        });
        if (deleteResponse.error) throw deleteResponse.error;
        const data = deleteResponse.data as Item;

        _queryApi.dispatch(deleteById(id));

        return { data };
      },
    }),
  }),
});

export default itemsApi;
