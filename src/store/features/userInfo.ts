import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

interface UserInfoState {
  name: string | null;
  token: string | null;
  role: string | null;
}

const initialState: UserInfoState = {
  name: null,
  token: null,
  role: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; role: string; name: string }>
    ) {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.role = action.payload.role;
      setCookie("auth_token", action.payload.token, {
        maxAge: 24 * 60 * 60,
      });
    },
    clearUserInfo(state) {
      state.token = null;
      state.role = null;
      deleteCookie("auth_token");
    },
  },
});

export const { clearUserInfo, setCredentials } = userInfoSlice.actions;

export default userInfoSlice.reducer;
