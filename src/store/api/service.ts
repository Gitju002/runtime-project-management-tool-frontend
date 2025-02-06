import {
  CreateServicePayload,
  CreateServiceResponse,
  GetAllProjectsQueryParams,
  GetAllServiceResponse,
  ServiceResponse,
} from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { create } from "domain";
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
    createService: builder.mutation<
      CreateServiceResponse,
      CreateServicePayload
    >({
      query: (payload) => ({
        url: "service/create",
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Service"],
      transformResponse: (response: CreateServiceResponse) => {
        // toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as ServiceResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const {
  useGetServiceByProjectQuery,
  useGetAllServicesQuery,
  useCreateServiceMutation,
} = serviceApi;
