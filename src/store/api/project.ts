import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllProjectResponse,
  GetAllProjectsQueryParams,
  ProjectListResponse,
} from "@/types/types";
import { toast } from "sonner";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjectList: builder.query<ProjectListResponse, void>({
      query: () => ({
        url: "project/names",
      }),
      transformErrorResponse: (error) => {
        const apiError = error.data as ProjectListResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
    getAllProjects: builder.query<
      GetAllProjectResponse,
      GetAllProjectsQueryParams
    >({
      query: ({ projectName, limit, page } = {}) => ({
        url: `project/all`,
        params: { projectName, limit, page }, // Add query params here
      }),
      transformResponse: (response) => {
        const apiResponse = response as GetAllProjectResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllProjectResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const { useGetProjectListQuery, useGetAllProjectsQuery } = projectApi;
