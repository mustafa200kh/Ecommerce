import { TProduct } from "@type/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosErrorHandler from "@utils/AxoisErrorHandler";
type TResponse = TProduct[];

const actGetProductsByCatPrfix = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, { rejectWithValue, signal }) => {
    try {
      let response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCatPrfix;
