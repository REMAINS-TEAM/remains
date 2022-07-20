import api, { apiTypes } from './';
import { getQueryString } from 'utils';
import { Search } from 'store/slices/search';

export const searchApi = api.injectEndpoints({
  endpoints: (build) => ({
    search: build.query<Search, string>({
      query: (param) => apiTypes.SEARCH + getQueryString({ q: param }),
    }),
  }),
});

export default searchApi;
