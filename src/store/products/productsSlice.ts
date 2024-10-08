import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrfix from "./act/actGetProductsByCatPrefix";
// types & gaurds
import { isString, TLoading, TProduct } from "@type/index";
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
  },
});
// destructing the {cleanProductsRecords} from products actions
export const { cleanProductsRecords } = productsSlice.actions;
export { actGetProductsByCatPrfix };

export default productsSlice.reducer;
