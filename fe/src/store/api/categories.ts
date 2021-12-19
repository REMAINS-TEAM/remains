import api from "./";
import { Category } from "../slices/categories";
import { getQueryString } from "../../utils";

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<
      Category[],
      Record<string, string | number | undefined> | void
    >({
      query: (params) => `categories` + getQueryString(params),
    }),
    getCategoryById: build.query<Category, number>({
      query: (id) => `categories/${id}`,
      transformResponse: (response: Category, meta, arg) => ({
        ...response,
        test: 1,
      }),
    }),
  }),
});

export default categoriesApi;
