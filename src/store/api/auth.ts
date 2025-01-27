import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserResponse } from "@/types/types";
import { toast } from "sonner";

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
      transformErrorResponse: (error) => {
        const apiError = error.data as UserResponse;
        toast.error(apiError.data.error);
        return error;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
