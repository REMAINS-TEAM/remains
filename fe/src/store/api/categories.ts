import api, { apiTypes } from './';
import { Category } from '../slices/categories';
import { getQueryString } from 'utils';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<
      { list: Category[]; parentCategory: Category | null; tree: Category[] },
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
    getCategoryById: build.query<{ category: Category }, number | string>({
      query: (id) => `${apiTypes.CATEGORIES}/${id}`,
      // transformResponse: (response: Category, meta, arg) => ({
      //   ...response,
      //   test: 1,
      // }),
    }),
  }),
});

export default categoriesApi;
