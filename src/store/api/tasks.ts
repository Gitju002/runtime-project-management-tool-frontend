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
      query: ({
        limit,
        page,
        userName,
        projectName,
        serviceName,
        sortBy,
        fromDate,
        toDate,
      }) => ({
        url: "/task/get-by-user",
        params: {
          limit,
          page,
          userName,
          projectName,
          serviceName,
          sortBy,
          fromDate,
          toDate,
        },
      }),
      providesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as GetAllTaskResponse;
        // toast.success("Task list fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllTaskResponse;
        // toast.error(apiError.message);
        return error;
      },
    }),

    getAllTask: builder.query<
      TaskResponsePerUser,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ projectName, userName }) => ({
        url: "/task/all",
        params: { projectName, userName },
      }),
      providesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as TaskResponsePerUser;
        // toast.success("Task list fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskResponsePerUser;
        // toast.error(apiError.message);
        return error;
      },
    }),
    markAsCompleted: builder.mutation<
      TaskResponse,
      {
        taskId: string;
      }
    >({
      query: (taskId) => ({
        url: `/task/mark-completed`,
        method: "PATCH",
        body: taskId,
      }),
      invalidatesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as TaskResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskResponsePerUser;
        toast.error(apiError.message);
        return error;
      },
    }),
    continueTaskTomorrow: builder.mutation<
      TaskResponse,
      {
        taskId: string;
      }
    >({
      query: (taskId) => ({
        url: `/task/continue-tomorrow`,
        method: "PATCH",
        body: taskId,
      }),
      invalidatesTags: ["Task"],
      transformResponse: (response) => {
        const apiResponse = response as TaskResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskResponsePerUser;
        toast.error(apiError.message);
        return error;
      },
    }),
    getCSVByUser: builder.mutation<Blob, string>({
      query: (userName) => ({
        url: `/task/export-csv/`,
        method: "GET",
        params: { userName },
        responseHandler: async (response) => response.blob(),
      }),
    }),

    getPDFByUser: builder.mutation<Blob, string>({
      query: (userName) => ({
        url: `/task/export-pdf/`,
        method: "GET",
        params: { userName },
        responseHandler: async (response) => response.blob(),
      }),
    }),
    getCSVByProject: builder.mutation<Blob, string>({
      query: (projectName) => ({
        url: `task/export-csv-by-project/${encodeURIComponent(projectName)}`,
        method: "GET",
        responseHandler: async (response) => response.blob(),
      }),
    }),
    getPDFByProject: builder.mutation<Blob, string>({
      query: (projectName) => ({
        url: `task/export-pdf-by-project/${encodeURIComponent(projectName)}`,
        method: "GET",
        responseHandler: async (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTaskByUserIDQuery,
  useGetAllTaskQuery,
  useMarkAsCompletedMutation,
  useContinueTaskTomorrowMutation,
  useGetCSVByUserMutation,
  useGetPDFByUserMutation,
  useGetCSVByProjectMutation,
  useGetPDFByProjectMutation,
} = taskApi;
