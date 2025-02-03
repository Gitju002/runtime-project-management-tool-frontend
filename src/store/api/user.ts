import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ExternalUser,
  GetAllProjectsQueryParams,
  GetAllUserResponse,
} from "@/types/types";
import { toast } from "sonner";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetAllUserResponse, GetAllProjectsQueryParams>({
      query: ({ userName, limit, page }) => ({
        url: "/user/get-all-users",
        params: { userName, limit, page },
      }),
      transformResponse: (response) => {
        const apiResponse = response as GetAllUserResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllUserResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
