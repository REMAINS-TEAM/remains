import api, { apiTypes } from './';
import { getQueryString } from 'utils';

export const brandsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBrands: build.query<
      {
        id: number;
        title: string;
      }[],
      {
        categoryId?: number;
      }
    >({
      query: (params) => apiTypes.BRANDS + getQueryString(params),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: apiTypes.BRANDS,
                id,
              })),
              apiTypes.BRANDS,
            ]
          : [apiTypes.BRANDS],
    }),
  }),
});

export default brandsApi;
