import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const billingService = createApi({
  reducerPath: "billings",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllBillings: builder.query({
      query: () => {
        return {
          url: "Billing-GET-ALL",
          method: "GET",
        };
      },
    }),
    getBillingById: builder.query({
      query: (id) => {
        return {
          url: `Billing-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),
    createBilling: builder.mutation({
      query: (newData) => {
        return {
          url: "Billing-POST",
          method: "POST",
          body: newData,
        };
      },
    }),
    updateBillingById: builder.mutation({
      query: (updateData) => {
        return {
          url: `Billing-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),
    deleteBillingById: builder.mutation({
      query: (id) => {
        return {
          url: `Billing-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllBillingsQuery,
  useGetBillingByIdQuery,
  useCreateBillingMutation,
  useDeleteBillingByIdMutation,
  useUpdateBillingByIdMutation,
} = billingService;
