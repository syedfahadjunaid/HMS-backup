import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  patientCreate: "",
  patientUpdate: "",
  patientDelete: "",
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    getAllPatients: (state, action) => {
      state.patients = action.payload;
    },
    createPatientChange: (state, action) => {
      state.patientCreate = action.payload;
    },
    updatePatientChange: (state, action) => {
      state.patientCreate = action.payload;
    },
    deletePatientChange: (state, action) => {
      state.patientCreate = action.payload;
    },
  },
});

export const {
  getAllPatients,
  createPatientChange,
  updatePatientChange,
  deletePatientChange,
} = patientSlice.actions;

export default patientSlice.reducer;
