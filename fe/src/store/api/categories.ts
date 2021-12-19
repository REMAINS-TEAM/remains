import api from "./";
import { Category } from "../slices/categories";

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategoryById: build.query<Category, number>({
      query: (id) => `categories/${id}`,
    }),
  }),
});

export const { useGetCategoryByIdQuery } = categoriesApi;
