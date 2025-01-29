import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import {
  CreateTaskPayload,
  GetAllResponse,
  Task,
  TaskResponse,
} from "@/types/types";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    createTask: builder.mutation<TaskResponse, CreateTaskPayload>({
      query: (task) => ({
        url: "task/create",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as TaskResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskResponse;
        toast.error(apiError.message);
        return error;
      },
    }),

    getTaskByUserID: builder.query<GetAllResponse, void>({
      query: () => ({
        url: "/task/get-by-user",
      }),
      providesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as GetAllResponse;
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const { useCreateTaskMutation, useGetTaskByUserIDQuery } = taskApi;
