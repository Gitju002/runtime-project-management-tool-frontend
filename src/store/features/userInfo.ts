import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/types/types";

interface UserInfoState {
  token: string | null;
  role: string | null;
}

const initialState: UserInfoState = {
  token: null,
  role: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
    clearUserInfo(state) {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setToken, setRole, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
