import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddedProjectType, ProjectListResponse } from "@/types/types";
import { toast } from "sonner";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjectList: builder.mutation<ProjectListResponse, void>({
      query: () => ({
        url: "project/names",
        method: "GET",
      }),
      transformErrorResponse: (error) => {
        const apiError = error.data as ProjectListResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const { useGetProjectListMutation } = projectApi;
