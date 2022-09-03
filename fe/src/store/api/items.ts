import api, { apiTypes } from './';
import { Item } from '../slices/items';
import { getQueryString } from 'utils';
import { deleteById } from 'store/slices/items';

export const itemsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query<
      { list: Item[]; offset: number; isOver: boolean },
      Record<string, string | number | undefined> | void
    >({
      query: (params) => `items` + getQueryString(params),
      providesTags: (result, error, arg) =>
        result?.list
          ? [
              ...result.list.map(({ id }) => ({ type: apiTypes.ITEMS, id })),
              apiTypes.ITEMS,
            ]
          : [apiTypes.ITEMS],
    }),

    getItemById: build.query<Item, number>({
      query: (id) => `${apiTypes.ITEMS}/${id}`,
      providesTags: (result, error, arg) => [`${apiTypes.ITEMS}/${arg}`],
    }),

    createItem: build.mutation<Item, FormData>({
      query: (body) => ({
        url: apiTypes.ITEMS,
        method: 'post',
        body,
      }),
      invalidatesTags: [apiTypes.ITEMS],
    }),

    updateItem: build.mutation<Item, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `${apiTypes.ITEMS}/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: (result) =>
        result ? [`${apiTypes.ITEMS}/${result.id}`, apiTypes.ITEMS] : [],
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
