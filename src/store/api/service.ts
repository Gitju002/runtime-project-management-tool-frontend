import { ServiceResponse } from "@/types/types";
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
    }),
  }),
});

export const { useGetServiceByProjectQuery } = serviceApi;
