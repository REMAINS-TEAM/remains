import api from './';
import { LS_KEY_TOKEN } from 'global/constants';
import { User, setCurrent } from 'store/slices/user';
import { getQueryString } from 'utils';

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
    me: build.query<User, void>({
      async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
        const meResponse = await fetchWithBQ({
          url: 'users/me',
          method: 'GET',
        });

        if (meResponse.error) throw meResponse.error;
        const userData = meResponse.data as User;
        _queryApi.dispatch(setCurrent(userData));
        return { data: userData };
      },
    }),
    logout: build.mutation<null, void>({
      async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
        const logoutResponse = await fetchWithBQ({
          url: 'users/logout',
          method: 'POST',
        });

        if (logoutResponse.error) throw logoutResponse.error;
        _queryApi.dispatch(setCurrent(null));
        localStorage.removeItem(LS_KEY_TOKEN);
        return { data: null };
      },
    }),
  }),
});

export default usersApi;
