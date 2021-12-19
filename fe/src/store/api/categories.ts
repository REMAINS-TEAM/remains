import api from "./";
import { Category } from "../slices/categories";

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<Category[], void>({
      query: () => `categories`,
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
