import { GetAllProjectsQueryParams, TaskStatusResponse } from "@/types/types";
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
        toast.success("Tasks per status fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as TaskStatusResponse;
        toast.error("Error fetching tasks per status");
        return apiError;
      },
    }),
  }),
});

export const { useGetTasksPerStatusQuery } = analyticsApi;
