import { createSlice } from "@reduxjs/toolkit";
import { GetTotalQuantitySelector } from "./selectors";
import { actGetProductByitems } from "./act/actGetProductByitems";
// types & gaurds
import { TProduct, TLoading, isString } from "@type/index";

interface ICartState {
  items: { [key: number]: number };
  productFullInfo: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    changeCartQuantityByItemID: (state, action) => {
      const myItemID = action.payload.id;
      state.items[myItemID] = action.payload.quantity;
    },
    deleteFromCartByItemID: (state, action) => {
      const itemID = action.payload;
      // we need to delete from items first
      delete state.items[itemID];
      // we need also to delete from product full info array
      state.productFullInfo = state.productFullInfo.filter(
        (el) => el.id !== itemID
      ); // returns all element while the element id not equal to payload id
    },
    deleteAllCartItems: (state) => {
      state.items = {};
      state.productFullInfo = [];
    },
    cleanUpProductFullInfo: (state) => {
      state.productFullInfo = [];
    }, // to clean the product details when we get out the cart page
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductByitems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductByitems.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetProductByitems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { GetTotalQuantitySelector, actGetProductByitems };
export const {
  addToCart,
  changeCartQuantityByItemID,
  deleteFromCartByItemID,
  deleteAllCartItems,
  cleanUpProductFullInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
