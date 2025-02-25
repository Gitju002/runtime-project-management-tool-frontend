import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddedProjectType,
  CreateProjectResponse,
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
      providesTags: ["Project"],
    }),
    getAllProjects: builder.query<
      GetAllProjectResponse,
      GetAllProjectsQueryParams
    >({
      query: ({ projectName, limit, page, sortBy, fromDate, toDate } = {}) => ({
        url: `project/all`,
        params: { projectName, limit, page, sortBy, fromDate, toDate }, // Add query params here
      }),
      transformResponse: (response) => {
        const apiResponse = response as GetAllProjectResponse;
        // toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllProjectResponse;
        // toast.error(apiError.message);
        return error;
      },
      providesTags: ["Project"],
    }),
    createProject: builder.mutation<CreateProjectResponse, AddedProjectType>({
      query: (payload) => ({
        url: "project/create",
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: CreateProjectResponse) => {
        // toast.success(response.message); // Show success message
        return response;
      },
      transformErrorResponse: (error: any) => {
        toast.error(error.data?.message || "Failed to create project");
        return error;
      },
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation<CreateProjectResponse, string>({
      query: (projectId) => ({
        url: `/project/delete/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
      transformResponse: (response) => {
        const apiResponse = response as CreateProjectResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as CreateProjectResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const {
  useGetProjectListQuery,
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
