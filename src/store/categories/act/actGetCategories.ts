import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategory } from "@type/index";
// Utils
import AxiosErrorHandler from "@utils/AxoisErrorHandler";
type Tresponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue, signal }) => {
    // the under score for ignoring the payload
    // rejectWithValue for Handling Errors
    try {
      // generic type for resposnse of type Tresponse defines the data shape
      const response = await axios.get<Tresponse>("/category", { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
