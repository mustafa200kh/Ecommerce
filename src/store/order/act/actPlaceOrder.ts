import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import AxoisErrorHandler from "@utils/AxoisErrorHandler";

const actPlaceOrder = createAsyncThunk(
  "order/placeOrder",
  async (subTotalPrice: number, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;

    const { auth, cart } = getState() as RootState;
    // getting my user id
    const userId = auth.user?.id;
    // Preparing items array
    const items = cart.productFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cart.items[el.id],
    }));

    try {
      const response = await axios.post("/orders", {
        userId,
        items,
        subTotalPrice,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(AxoisErrorHandler(error));
    }
  }
);

export default actPlaceOrder;
