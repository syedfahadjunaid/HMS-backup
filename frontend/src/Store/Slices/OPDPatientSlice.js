import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OPDPatients: [],
  createOPDPatient: "",
  updateOPDPatient: "",
  deleteOPDPatient: "",
};

const OPDPatientSlice = createSlice({
  name: "OPDPatients",
  initialState,
  reducers: {
    getAllOPDPatients: (state, action) => {
      state.OPDPatients = action.payload;
    },
    createOPDPatientChange: (state, action) => {
      state.createOPDPatient = action.payload;
    },
    updateOPDPatientChange: (state, action) => {
      state.updateOPDPatient = action.payload;
    },
    deleteOPDPatientChange: (state, action) => {
      state.deleteOPDPatient = action.payload;
    },
  },
});

export const {
  getAllOPDPatients,
  createOPDPatientChange,
  updateOPDPatientChange,
  deleteOPDPatientChange,
} = OPDPatientSlice.actions;

export default OPDPatientSlice.reducer;
