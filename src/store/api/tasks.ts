import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import {
  CreateTaskPayload,
  GetAllProjectsQueryParams,
  GetAllTaskResponse,
  TaskResponse,
  TaskResponsePerUser,
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
        // toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskResponse;
        toast.error(apiError.message);
        return error;
      },
    }),

    getTaskByUserID: builder.query<
      GetAllTaskResponse,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ limit, page, userName, projectName, serviceName, sortBy }) => ({
        url: "/task/get-by-user",
        params: { limit, page, userName, projectName, serviceName, sortBy },
      }),
      providesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as GetAllTaskResponse;
        // toast.success("Task list fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllTaskResponse;
        toast.error(apiError.message);
        return error;
      },
    }),

    getAllTask: builder.query<
      TaskResponsePerUser,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ projectName }) => ({
        url: "/task/all",
        params: { projectName },
      }),
      providesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as TaskResponsePerUser;
        // toast.success("Task list fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskResponsePerUser;
        toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTaskByUserIDQuery,
  useGetAllTaskQuery,
} = taskApi;
