import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientService = createApi({
  reducerPath: "patients",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),
  endpoints: (builder) => ({
    getAllPatients: builder.query({
      query: () => {
        return {
          url: "Patient-GET-ALL",
          method: "GET",
        };
      },
    }),

    getPatientById: builder.query({
      query: (id) => {
        return {
          url: `Patient-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),

    addPatient: builder.mutation({
      query: (newData) => {
        return {
          url: "Patient-POST",
          method: "POST",
          body: newData,
        };
      },
    }),

    updatePatientById: builder.mutation({
      query: (updateData) => {
        return {
          url: `Patient-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    deletePatientById: builder.mutation({
      query: (id) => {
        return {
          url: `Patient-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useUpdatePatientByIdMutation,
  useDeletePatientByIdMutation,
  useAddPatientMutation,
  useGetPatientByIdQuery,
  useGetAllPatientsQuery,
} = patientService;
