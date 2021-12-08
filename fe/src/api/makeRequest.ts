import axios, { Method } from "axios";

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
    url,
    method,
    params,
    data,
    headers,
  });
