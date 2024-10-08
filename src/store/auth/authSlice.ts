import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@type/tLoading.types";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import { isString } from "@type/gaurds";

interface IAuthSlice {
  user: {
    email: string;
    firstname: string;
    id: number;
    lastname: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthSlice = {
  accessToken: null,
  user: null,
  loading: "idle",
  error: null,
};

const auth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    resetMyState: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    signOutState: (state) => {
      state.error = null;
      state.loading = "idle";
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers(builder) {
    // auth register processing
    builder.addCase(actAuthRegister.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // auth Login processing
    builder.addCase(actAuthLogin.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { resetMyState, signOutState } = auth.actions;
export { actAuthRegister, actAuthLogin };
export default auth.reducer;
