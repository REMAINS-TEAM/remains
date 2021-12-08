import axios, { Method } from "axios";

const API_URL = "http://localhost:8080"; // TODO: move to ENV VARS

export default ({
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
}) =>
  axios({
    url: API_URL + url,
    method,
    params,
    data,
    headers,
  });
