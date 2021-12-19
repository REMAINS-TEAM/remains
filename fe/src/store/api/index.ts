// initialize an empty api service that we'll inject endpoints into later as needed
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export default createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("remains.token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
