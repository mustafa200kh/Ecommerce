// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// utils
import AxoisErrorHandler from "@utils/AxoisErrorHandler";
// Axios
import axios from "axios";

type TFromLoginData = {
  email: string;
  password: string;
};

type TResponseData = {
  accessToken: string;
  user: {
    email: string;
    firstname: string;
    id: number;
    lastname: string;
  };
};
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFromLoginData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post<TResponseData>("/login", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(AxoisErrorHandler(error));
    }
  }
);

export default actAuthLogin;
