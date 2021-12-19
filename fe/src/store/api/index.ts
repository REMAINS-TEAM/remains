// initialize an empty api service that we'll inject endpoints into later as needed
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export default createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: () => ({}),
});
