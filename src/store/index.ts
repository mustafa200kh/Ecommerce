import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
import order from "./order/orderSlice";

const rootPersistsConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
  order,
});

const persistedReducer = persistReducer(rootPersistsConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
