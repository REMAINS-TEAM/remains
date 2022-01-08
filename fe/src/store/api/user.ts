import api from './';
import { LS_KEY_TOKEN } from 'global/constants';
import { User, setCurrent } from 'store/slices/user';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { token: string },
      {
        login: string;
        password: string;
      }
    >({
      async queryFn(
        { login, password },
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) {
        const loginResponse = await fetchWithBQ({
          url: 'users/login',
          method: 'POST',
          body: { login, password },
        });

        if (loginResponse.error) throw loginResponse.error;
        const data = loginResponse.data as { token: string };

        if (data.token) {
          localStorage.setItem(LS_KEY_TOKEN, data.token);
          const meResponse = await fetchWithBQ({
            url: 'users/me',
            method: 'GET',
            headers: { authorization: `Bearer ${data.token}` },
          });

          if (meResponse.error) throw meResponse.error;
          const userData = meResponse.data as User;
          _queryApi.dispatch(setCurrent(userData));
        }

        return { data };
      },
    }),
  }),
});

export default usersApi;
