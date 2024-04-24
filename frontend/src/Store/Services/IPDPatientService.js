import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const IPDPatientService = createApi({
  reducerPath: "IPDPatients",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),

  endpoints: (builder) => ({
    getAllIPDPatients: builder.query({
      query: () => {
        return {
          url: "IPDPatient-GET-ALL",
          method: "GET",
        };
      },
    }),

    getIPDPatientById: builder.query({
      query: (id) => {
        return {
          url: `IPDPatient-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),

    createIPDPatient: builder.mutation({
      query: (newData) => {
        return {
          url: `IPDPatient-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),

    updateIPDPatientById: builder.mutation({
      query: (updateData) => {
        return {
          url: `IPDPatient-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    deleteIPDPatientById: builder.mutation({
      query: (id) => {
        return {
          url: `IPDPatient-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllIPDPatientsQuery,
  useGetIPDPatientByIdQuery,
  useCreateIPDPatientMutation,
  useUpdateIPDPatientByIdMutation,
  useDeleteIPDPatientByIdMutation,
} = IPDPatientService;
