import api, { apiTypes } from './';
import { Company } from 'store/slices/user';

export const companiesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCompanies: build.query<Company[], void>({
      query: () => `companies`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: apiTypes.COMPANIES, id })),
              apiTypes.COMPANIES,
            ]
          : [apiTypes.COMPANIES],
    }),
    createCompany: build.mutation<
      Company,
      { name: string; description?: string }
    >({
      query: (body) => ({
        url: apiTypes.COMPANIES,
        method: 'post',
        body,
      }),
      invalidatesTags: [apiTypes.COMPANIES],
    }),
  }),
});

export default companiesApi;
