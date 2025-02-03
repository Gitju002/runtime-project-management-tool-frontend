import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/auth";
import { projectApi } from "./api/project";
import { serviceApi } from "./api/service";
import { project_TD_Api } from "./api/projectTypeDesc";
import { taskApi } from "./api/tasks";
import userReducer from "./features/userInfo";
import { EnhancedStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [project_TD_Api.reducerPath]: project_TD_Api.reducer,
    userInfo: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(projectApi.middleware)
      .concat(serviceApi.middleware)
      .concat(taskApi.middleware)
      .concat(project_TD_Api.middleware),
});

setupListeners(store.dispatch);

export type AppStore = EnhancedStore;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
