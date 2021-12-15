import makeRequest from "../makeRequest";
import { Category } from "../../store/slices/categories";

export const getAll = () =>
  makeRequest<Category[]>({
    url: "/categories",
  });
