import makeRequest from "../makeRequest";

export const getAllCategories = () =>
  makeRequest({
    url: "/api/categories",
  });
