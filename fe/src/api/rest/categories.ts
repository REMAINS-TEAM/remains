import makeRequest from "../makeRequest";

export const getAll = () =>
  makeRequest({
    url: "/api/categories",
  });
