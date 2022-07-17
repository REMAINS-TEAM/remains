import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categories';
import itemsReducer from './slices/items';
import userReducer from './slices/user';
import notificationReducer from './slices/notification';
import menuReducer from './slices/menu';

import api from './api';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
    user: userReducer,
    notification: notificationReducer,
    menu: menuReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
