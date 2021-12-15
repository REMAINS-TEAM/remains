import makeRequest from "../makeRequest";

export interface Item {
  id: number;
  title: String;
  description: String;
  images: String[];
  price: number;
  categoryId: number;
}

export const getAll = () =>
  makeRequest<Item[]>({
    url: "/items",
  });
