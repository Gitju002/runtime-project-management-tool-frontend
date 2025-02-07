import {
  GetAllProjectsQueryParams,
  getDurationAnalyticsResponse,
  getNoOfUsersByProjectResponse,
  TasksDuration,
  TasksPerProject,
  TaskStatusResponse,
} from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Analytics"],
  endpoints: (builder) => ({
    getTasksPerStatus: builder.query<
      TaskStatusResponse,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ userName }) => ({
        url: "analytics/task-per-status",
        params: { userName },
      }),
      providesTags: ["Analytics"],
      transformResponse: (response) => {
        const apiResponse = response as TaskStatusResponse;
        // toast.success("Tasks per status fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskStatusResponse;
        // toast.error("Error fetching tasks per status");
        return apiError;
      },
    }),
    getTasksPerProject: builder.query<
      TasksPerProject,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ userName }) => ({
        url: "analytics/task-per-project",
        params: { userName },
      }),
      providesTags: ["Analytics"],
      transformResponse: (response) => {
        const apiResponse = response as TasksPerProject;
        // toast.success("Tasks per project fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TasksPerProject;
        // toast.error("Error fetching tasks per project");
        return apiError;
      },
    }),

    getDurationPerProject: builder.query<
      TasksDuration,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ userName }) => ({
        url: "analytics/project-work-duration",
        params: {
          userName,
        },
      }),
      providesTags: ["Analytics"],
      transformResponse: (response) => {
        const apiResponse = response as TasksDuration;
        // toast.success("Duration per project fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TasksDuration;
        // toast.error("Error fetching duration per project");
        return apiError;
      },
    }),
    getDurationAnalytics: builder.query<
      getDurationAnalyticsResponse,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ projectName }) => ({
        url: "analytics/project-duration",
        params: {
          projectName,
        },
      }),
      providesTags: ["Analytics"],
      transformResponse: (response) => {
        const apiResponse = response as getDurationAnalyticsResponse;
        // toast.success("Duration per project fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as getDurationAnalyticsResponse;
        // toast.error("Error fetching duration per project");
        return apiError;
      },
    }),
    getNoOfUsersByProject: builder.query<
      getNoOfUsersByProjectResponse,
      Partial<GetAllProjectsQueryParams>
    >({
      query: ({ projectName }) => ({
        url: "analytics/no-of-user-per-project",
        params: { projectName },
      }),
      providesTags: ["Analytics"],
      transformResponse: (response) => {
        const apiResponse = response as getNoOfUsersByProjectResponse;
        // toast.success("Tasks per status fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as getNoOfUsersByProjectResponse;
        // toast.error("Error fetching tasks per status");
        return apiError;
      },
    }),
  }),
});

export const {
  useGetTasksPerStatusQuery,
  useGetTasksPerProjectQuery,
  useGetDurationPerProjectQuery,
  useGetDurationAnalyticsQuery,
  useGetNoOfUsersByProjectQuery,
} = analyticsApi;
