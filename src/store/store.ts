import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/auth";
import { projectApi } from "./api/project";
import { serviceApi } from "./api/service";
import { taskApi } from "./api/tasks";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(projectApi.middleware)
      .concat(serviceApi.middleware)
      .concat(taskApi.middleware),
});

setupListeners(store.dispatch);
