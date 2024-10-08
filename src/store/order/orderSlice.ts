import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TOrederItems } from "@type/index";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

interface IOrderState {
  orders: TOrederItems[];
  loading: TLoading;
  error: null | string;
}
const initialState: IOrderState = {
  orders: [],
  loading: "idle",
  error: null,
};

const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearSuccessOnLeavingCartPage: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // placing the order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Get All User Orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.orders = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default order.reducer;
export { actPlaceOrder, actGetOrders };

export const { clearSuccessOnLeavingCartPage } = order.actions;
