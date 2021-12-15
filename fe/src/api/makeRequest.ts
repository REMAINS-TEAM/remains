import axios, { AxiosPromise, Method } from "axios";

const API_URL = "http://localhost:8080/api"; // TODO: move to ENV VARS

export default <T>({
  url = "",
  method = "GET",
  params = {},
  data = {},
  headers = {},
}: {
  url?: string;
  method?: Method;
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, any>;
}): AxiosPromise<T> =>
  axios({
    url: API_URL + url,
    method,
    params,
    data,
    headers,
  });
