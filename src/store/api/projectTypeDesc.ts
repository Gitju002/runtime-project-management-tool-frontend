import {
  GetAllProjectsQueryParams,
  GetAllTypeDescResponse,
  ProjectTypeDesc,
} from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create } from "domain";
import { toast } from "sonner";

export const project_TD_Api = createApi({
  reducerPath: "project_TD_Api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["ProjectType"],
  endpoints: (builder) => ({
    getAllProjectTypedesc: builder.query<
      GetAllTypeDescResponse,
      GetAllProjectsQueryParams
    >({
      query: ({ projectName, location, limit, page } = {}) => ({
        url: "projectTypeDesc/all",
        params: { projectName, location, limit, page },
      }),
      transformResponse: (response) => {
        const apiResponse = response as GetAllTypeDescResponse;
        // toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllTypeDescResponse;
        // toast.error(apiError.message);
        return error;
      },
      providesTags: ["ProjectType"],
    }),
    createProjectTypeDesc: builder.mutation<
      GetAllTypeDescResponse,
      Partial<ProjectTypeDesc>
    >({
      query: (body) => ({
        url: "projectTypeDesc/create",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        const apiResponse = response as GetAllTypeDescResponse;
        // toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllTypeDescResponse;
        toast.error(apiError.message);
        return error;
      },
      invalidatesTags: ["ProjectType"],
    }),
  }),
});

export const {
  useGetAllProjectTypedescQuery,
  useCreateProjectTypeDescMutation,
} = project_TD_Api;
