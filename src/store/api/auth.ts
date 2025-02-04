import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserPayload, UserResponse } from "@/types/types";
import { toast } from "sonner";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, UserPayload>({
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
        toast.error(apiError?.data?.error || "Error logging in");
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
        toast.error(apiError?.message || "Error logging out");
        return error;
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
