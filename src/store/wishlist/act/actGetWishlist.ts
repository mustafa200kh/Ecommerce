import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// utils
import AxoisErrorHandler from "@utils/AxoisErrorHandler";
import { RootState } from "@store/index";

type TDataType = "productFullInfo" | "productIDs";

const actGetWishList = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (myData: TDataType, thunkAPI) => {
    let { rejectWithValue, signal, getState } = thunkAPI;

    const { auth } = getState() as RootState; // to get the the id of the user

    try {
      const userWishlist = await axios.get<{ itemId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`
      );

      // if no data returned return empty section
      if (!userWishlist.data.length) {
        return { data: [], type: "empty" };
      }
      // if we want to get items IDs we return this section
      if (myData === "productIDs") {
        const ItemsIDs = userWishlist.data.map((el) => {
          return el.itemId;
        });
        return { data: ItemsIDs, type: "productIDs" };
      } else if (myData === "productFullInfo") {
        // first concatenate items Ids
        const concatenateIDs = userWishlist.data
          .map((el) => `id=${el.itemId}`)
          .join("&");

        // Make api call on this ids
        const response = await axios.get(`/products?${concatenateIDs}`, {
          signal,
        });

        return { data: response.data, type: "productFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(AxoisErrorHandler(error));
    }
  }
);

export default actGetWishList;
