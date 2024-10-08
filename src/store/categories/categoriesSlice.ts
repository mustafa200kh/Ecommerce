import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
// types & gaurds
import { TCategory, TLoading, isString } from "@type/index";
interface IcategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: IcategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanUpCategoriesRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetCategories };
export const { cleanUpCategoriesRecords } = categoriesSlice.actions;
export default categoriesSlice.reducer;
