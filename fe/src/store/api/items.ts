import api, { apiTypes } from './';
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
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: apiTypes.ITEMS, id })),
              apiTypes.ITEMS,
            ]
          : [apiTypes.ITEMS],
    }),
    getItemById: build.query<Item, number>({
      query: (id) => `items/${id}`,
    }),
    createItem: build.mutation<Item, FormData>({
      query: (body) => ({
        url: apiTypes.ITEMS,
        method: 'post',
        body,
      }),
      invalidatesTags: [apiTypes.ITEMS],
    }),
    deleteItem: build.mutation<Item, number>({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        const deleteResponse = await fetchWithBQ({
          url: `${apiTypes.ITEMS}/${id}`,
          method: 'DELETE',
        });
        if (deleteResponse.error) throw deleteResponse.error;
        const data = deleteResponse.data as Item;

        _queryApi.dispatch(deleteById(id));

        return { data };
      },
      invalidatesTags: [apiTypes.ITEMS],
    }),
  }),
});

export default itemsApi;
