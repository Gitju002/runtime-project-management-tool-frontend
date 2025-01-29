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
  }),
});

export const { useGetProjectListQuery } = projectApi;
