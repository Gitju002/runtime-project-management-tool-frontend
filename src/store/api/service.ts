import {
  GetAllProjectsQueryParams,
  GetAllServiceResponse,
  ServiceResponse,
} from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Service"],
  endpoints: (builder) => ({
    getServiceByProject: builder.query<ServiceResponse, string>({
      query: (projectName) => ({
        url: `service/get-by-project/${encodeURIComponent(projectName)}`,
      }),
      transformErrorResponse: (error) => {
        const apiError = error.data as ServiceResponse;
        toast.error(apiError.message);
        return error;
      },
      providesTags: ["Service"],
    }),

    getAllServices: builder.query<
      GetAllServiceResponse,
      GetAllProjectsQueryParams
    >({
      query: ({ projectName, limit, page } = {}) => ({
        url: `service/all`,
        params: { projectName, limit, page },
      }),
      transformResponse: (response) => {
        const apiResponse = response as GetAllServiceResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllServiceResponse;
        toast.error(apiError.message);
        return error;
      },
      providesTags: ["Service"],
    }),
  }),
});

export const { useGetServiceByProjectQuery, useGetAllServicesQuery } =
  serviceApi;
