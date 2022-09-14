import api, { apiTypes } from './';
import { Category } from '../slices/categories';
import { getQueryString } from 'utils';
import { Company } from 'store/slices/user';

export interface ICategoryFilters {
  brands: { id: number; title: string }[] | null;
}

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAll: build.query<
      {
        list: Category[];
        parentCategory: Category | null;
        tree: Category[];
        filters: ICategoryFilters;
      },
      Record<string, string | number | undefined> | void
    >({
      query: (params) => apiTypes.CATEGORIES + getQueryString(params),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.list.map(({ id }) => ({
                type: apiTypes.CATEGORIES,
                id,
              })),
              apiTypes.CATEGORIES,
            ]
          : [apiTypes.CATEGORIES],
    }),
    getById: build.query<{ category: Category }, number | string>({
      query: (id) => `${apiTypes.CATEGORIES}/${id}`,
      // transformResponse: (response: Category, meta, arg) => ({
      //   ...response,
      //   test: 1,
      // }),
    }),
    create: build.mutation<Company, { name: string; description?: string }>({
      query: (body) => ({
        url: apiTypes.COMPANIES,
        method: 'post',
        body,
      }),
      invalidatesTags: [apiTypes.COMPANIES],
    }),
  }),
});

export default categoriesApi;
