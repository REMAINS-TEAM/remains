import makeRequest from "../makeRequest";

export const getAllItems = () =>
  makeRequest({
    url: "/api/items",
  });
