import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrfix from "./act/actGetProductsByCatPrefix";
// types & gaurds
import { isString, TLoading, TProduct } from "@type/index";
import actGetSampleOfProducts from "./act/actGetSampleOfProductd";
import actGetProductByID from "./act/actGetProductByID";
interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanProductsRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    // products by category
    builder.addCase(actGetProductsByCatPrfix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrfix.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrfix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // sample of products
    builder.addCase(actGetSampleOfProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetSampleOfProducts.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records = action.payload;
    });
    builder.addCase(actGetSampleOfProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Product By Id
    builder.addCase(actGetProductByID.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductByID.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records.push(action.payload);
    });
    builder.addCase(actGetProductByID.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
// destructing the {cleanProductsRecords} from products actions
export const { cleanProductsRecords } = productsSlice.actions;
export { actGetProductsByCatPrfix, actGetSampleOfProducts, actGetProductByID };

export default productsSlice.reducer;
