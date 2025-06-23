import { TProduct } from "@type/tProduct.types"; // type of product
import { createAsyncThunk } from "@reduxjs/toolkit"; // async redux
import AxiosErrorHandler from "@utils/AxoisErrorHandler"; // utility for handling Axios error
import axios from "axios";
type TResponse = TProduct[];

const actGetSampleOfProducts = createAsyncThunk(
  "products/sample",
  async (_, { rejectWithValue, signal }) => {
    try {
      let response = await axios.get<TResponse>(`/products?_limit=16`, {
        signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetSampleOfProducts;
