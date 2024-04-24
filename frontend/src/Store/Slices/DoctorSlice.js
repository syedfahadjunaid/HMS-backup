import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
  doctorProfessionalDetails: [],
  createDoctor: "",
  updateDoctor: "",
  deleteDoctor: "",
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    getAllDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    getAllDoctorsProfessionalDetails: (state, action) => {
      state.doctorProfessionalDetails = action.payload;
    },
    createDoctorChange: (state, action) => {
      state.createDoctor = action.payload;
    },
    updateDoctorChange: (state, action) => {
      state.updateDoctor = action.payload;
    },
    deleteDoctorChange: (state, action) => {
      state.deleteDoctor = action.payload;
    },
  },
});

export const {
  getAllDoctors,
  createDoctorChange,
  updateDoctorChange,
  deleteDoctorChange,
  getAllDoctorsProfessionalDetails,
} = doctorSlice.actions;

export default doctorSlice.reducer;
