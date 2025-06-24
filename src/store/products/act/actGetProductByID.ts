import { createAsyncThunk } from "@reduxjs/toolkit";
import AxoisErrorHandler from "@utils/AxoisErrorHandler";
import axios from "axios";
import { TProduct } from "@type/index";

type TResponse = TProduct;

const actGetProductByID = createAsyncThunk(
  "product/getProductById",
  async (id: number, { rejectWithValue, signal }) => {
    try {
      let response = await axios.get<TResponse>(`products/${id}`, { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(AxoisErrorHandler(error));
    }
  }
);

export default actGetProductByID;
