import makeRequest from "../makeRequest";
import { Item } from "./items";

export interface Category {
  id: number;
  title: string;
  description?: string;
  sort: string;
  parentId: string;
  items?: Item[];
}

export const getAll = () =>
  makeRequest<Category[]>({
    url: "/categories",
  });
