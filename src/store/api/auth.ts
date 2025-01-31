import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUserResponse, User, UserResponse } from "@/types/types";
import { toast } from "sonner";
import { setCookie, deleteCookie } from "cookies-next";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, Partial<User>>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        const apiResponse = response as UserResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as UserResponse;
        toast.error(apiError.data.error);
        return error;
      },
    }),
    logout: builder.mutation<UserResponse, void>({
      query: () => ({
        url: "auth/logout",
      }),
      transformResponse: (response) => {
        const apiResponse = response as UserResponse;
        toast.success(apiResponse.message);
        return apiResponse;
      },
      transformErrorResponse: (error) => {
        const apiError = error.data as UserResponse;
        toast.error(apiError.message);
        return error;
      },
    }),

    getUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: "auth/me",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery } = authApi;
