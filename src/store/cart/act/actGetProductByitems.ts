import { TProduct } from "@type/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
// Utils
import AxiosErrorHandler from "@utils/AxoisErrorHandler";
type TRespnse = TProduct[];
const actGetProductByitems = createAsyncThunk(
  "cart/actGetProductByitems",
  async (_, thunkAPI) => {
    let { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const myKeysArray = Object.keys(cart.items);
    // if dont has products in my cart the action will bring all product from the data base so i checks the cart items first
    if (!myKeysArray.length) {
      return fulfillWithValue([]);
    }
    try {
      const fullIDs = myKeysArray.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TRespnse>(`/products?${fullIDs}`, {
        signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export { actGetProductByitems };
