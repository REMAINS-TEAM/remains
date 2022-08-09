import api, { apiTypes } from './';
import { Company } from 'store/slices/user';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
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
