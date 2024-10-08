import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxoisErrorHandler from "@utils/AxoisErrorHandler";
import { RootState } from "@store/index";

const actLikeToogler = createAsyncThunk(
  "wishlist/actLikeToggler",
  async (id: number, thunkAPI) => {
    let { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      let response = await axios.get(
        `/wishlist?userId=${auth.user?.id}&itemId=${id}`
      );
      if (response.data.length > 0) {
        await axios.delete(`/wishlist/${response.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", {
          userId: auth.user?.id,
          itemId: id,
        });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(AxoisErrorHandler(error));
    }
  }
);

export default actLikeToogler;
