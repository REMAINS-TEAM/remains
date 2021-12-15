import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../api/rest/items";

export interface Category {
  id: number;
  title: string;
  description?: string;
  sort: number;
  parentId: number;
  // items?: Item[];
}

const initialState: Category[] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setNew: (state) => {
      state.push({
        id: 1,
        title: "test",
        sort: 1,
        parentId: 1,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNew } = categoriesSlice.actions;

export default categoriesSlice.reducer;
