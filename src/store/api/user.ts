import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ExternalUser,
  GetAllProjectsQueryParams,
  GetAllUserResponse,
  GetAllUsersListResponse,
  GetUserResponse,
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
      providesTags: ["User"],
      transformResponse: (response) => {
        const apiResponse = response as GetAllUserResponse;
        // toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllUserResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
    getUsersList: builder.query<GetAllUsersListResponse, void>({
      query: () => ({
        url: "/user/get-user-list",
      }),
      providesTags: ["User"],
      transformResponse: (response) => {
        const apiResponse = response as GetAllUsersListResponse;
        // toast.success("User list fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetAllUsersListResponse;
        toast.error(apiError.message);
        return error;
      },
    }),
    getUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: "/user/get-user",
      }),
      providesTags: ["User"],
      transformResponse: (response) => {
        const apiResponse = response as GetUserResponse;
        // toast.success("User fetched successfully");
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as GetUserResponse;
        // toast.error(apiError.message);
        return error;
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUsersListQuery, useGetUserQuery } =
  userApi;
