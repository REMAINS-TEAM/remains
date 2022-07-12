import api, { apiTypes } from './';
import { LS_KEY_TOKEN } from 'global/constants';
import { setCurrent, User } from 'store/slices/user';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ status: string }, { phone: string }>({
      query: (body) => ({
        url: `${apiTypes.USERS}/login`,
        method: 'post',
        body,
      }),
    }),

    confirmCode: build.mutation<
      { token: string },
      {
        phone: string;
        code: number;
      }
    >({
      async queryFn({ phone, code }, _queryApi, _extraOptions, fetchWithBQ) {
        const loginResponse = await fetchWithBQ({
          url: `${apiTypes.USERS}/code`,
          method: 'POST',
          body: { phone, code },
        });

        if (loginResponse.error) throw loginResponse.error;
        const data = loginResponse.data as { token: string };

        if (data.token) {
          localStorage.setItem(LS_KEY_TOKEN, data.token);
          const meResponse = await fetchWithBQ({
            url: `${apiTypes.USERS}/me`,
            method: 'GET',
            headers: { authorization: `Bearer ${data.token}` },
          });

          if (meResponse.error) throw meResponse.error;
          const userData = meResponse.data as User;
          _queryApi.dispatch(setCurrent(userData));
        }

        return { data };
      },
      invalidatesTags: [apiTypes.USERS],
    }),

    me: build.query<User, void>({
      async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
        const meResponse = await fetchWithBQ({
          url: `${apiTypes.USERS}/me`,
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
          url: `${apiTypes.USERS}/logout`,
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
