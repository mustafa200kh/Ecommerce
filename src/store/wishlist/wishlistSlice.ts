import { createSlice } from "@reduxjs/toolkit";
import actLikeToogler from "./act/actLikeToggle";
import actGetWishList from "./act/actGetWishlist";

import { isString, TLoading, TProduct } from "@type/index";
// Auth action log out
import { signOutState } from "@store/auth/authSlice";

interface IWishlistState {
  itemsID: number[];
  wishlistProductFullInfo: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IWishlistState = {
  itemsID: [],
  wishlistProductFullInfo: [],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanUpwishlistProductFullInfo: (state) => {
      state.wishlistProductFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // pending request handling state
    builder.addCase(actLikeToogler.pending, (state) => {
      state.error = null;
      // the loading we will handle it inside the component
    });

    // fulfilled request handling state
    builder.addCase(actLikeToogler.fulfilled, (state, action) => {
      if (action.payload?.type === "add") {
        state.itemsID.push(action.payload.id);
      } else {
        // let index = state.itemsID.indexOf(action.payload.id);
        // if (index > -1) {
        //   state.itemsID.splice(index, 1);
        // }
        state.itemsID = state.itemsID.filter((el) => el !== action.payload?.id);
        state.wishlistProductFullInfo = state.wishlistProductFullInfo.filter(
          (el) => el.id !== action.payload?.id
        );
      }
    });
    // Rejected request handling state
    builder.addCase(actLikeToogler.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    //ACT GET PRODUCTS OF USER WISHLIST
    // pending request handling state
    builder.addCase(actGetWishList.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });

    // fulfilled request handling state
    builder.addCase(actGetWishList.fulfilled, (state, action) => {
      state.loading = "succeded";
      if (action.payload?.type === "productIDs") {
        state.itemsID = action.payload.data;
      }
      if (action.payload?.type === "productFullInfo") {
        state.wishlistProductFullInfo = action.payload.data;
      }
      if (action.payload?.type === "empty") {
        state.itemsID = [];
        state.wishlistProductFullInfo = [];
      }
    });
    // Rejected request handling state
    builder.addCase(actGetWishList.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(signOutState, (state) => {
      state.itemsID = [];
      state.wishlistProductFullInfo = [];
    });
  },
});

export default wishlistSlice.reducer;
export const { cleanUpwishlistProductFullInfo } = wishlistSlice.actions;
export { actLikeToogler, actGetWishList };
