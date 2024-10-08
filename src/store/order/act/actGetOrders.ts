// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
// type
import { TOrederItems } from "@type/index";
// utils
import AxoisErrorHandler from "@utils/AxoisErrorHandler";
// axios
import axios from "axios";

type TResponse = TOrederItems[];
const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;
    const userId = auth.user?.id;

    try {
      const response = await axios.get<TResponse>(`/orders?userId=${userId}`, {
        signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(AxoisErrorHandler(error));
    }
  }
);

export default actGetOrders;
