import { createAsyncThunk } from "@reduxjs/toolkit";
import AxoisErrorHandler from "@utils/AxoisErrorHandler";
import axios from "axios";

type TFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (registerData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post("/register", registerData);
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(AxoisErrorHandler(error));
    }
  }
);

export default actAuthRegister;
