import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminService = createApi({
  reducerPath: "Admin",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.React_App_Base_url,
  }),

  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => {
        return {
          url: `Admin-GET-ALL`,
          method: "GET",
        };
      },
    }),

    getAdminById: builder.query({
      query: (id) => {
        return {
          url: `Admin-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),

    adminRegister: builder.mutation({
      query: (newData) => {
        return {
          url: `AdminRegister`,
          method: "POST",
          body: newData,
        };
      },
    }),

    adminLogin: builder.mutation({
      query: (loginData) => {
        return {
          url: `AdminLogin`,
          method: "POST",
          body: loginData,
        };
      },
    }),

    adminUpdateById: builder.mutation({
      query: (updateData) => {
        return {
          url: `Admin-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    adminChangePasswordById: builder.mutation({
      query: (updateData) => {
        return {
          url: `AdminChangePasswordSelf-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    adminProfile: builder.query({
      query: (token) => {
        return {
          url: `AdminProfile`,
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        };
      },
    }),

    adminActiveInactive: builder.mutation({
      query: (updateData) => {
        return {
          url: `AdminActive/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminRegisterMutation,
  useAdminUpdateByIdMutation,
  useGetAdminByIdQuery,
  useGetAllAdminsQuery,
  useAdminProfileQuery,
  useAdminActiveInactiveMutation,
  useAdminChangePasswordByIdMutation,
} = AdminService;
