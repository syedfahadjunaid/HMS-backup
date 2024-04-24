import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OPDPatientService = createApi({
  reducerPath: "OPDPatients",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.React_App_Base_url }),

  endpoints: (builder) => ({
    getAllOPDPatient: builder.query({
      query: () => {
        return {
          url: "OPDPatient-GET-ALL",
          method: "GET",
        };
      },
    }),

    getOPDPatientById: builder.query({
      query: (id) => {
        return {
          url: `OPDPatient-GET-ONE/${id}`,
          method: "GET",
        };
      },
    }),

    createOPDPatient: builder.mutation({
      query: (newData) => {
        return {
          url: `OPDPatient-POST`,
          method: "POST",
          body: newData,
        };
      },
    }),

    updateOPDPatientById: builder.mutation({
      query: (updateData) => {
        return {
          url: `OPDPatient-PUT/${updateData.id}`,
          method: "PUT",
          body: updateData.data,
        };
      },
    }),

    deleteOPDPatientById: builder.mutation({
      query: (id) => {
        return {
          url: `OPDPatient-DELETE/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllOPDPatientQuery,
  useGetOPDPatientByIdQuery,
  useCreateOPDPatientMutation,
  useUpdateOPDPatientByIdMutation,
  useDeleteOPDPatientByIdMutation,
} = OPDPatientService;
