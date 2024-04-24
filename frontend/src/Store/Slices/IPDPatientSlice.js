import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipdPatients: [],
  createIpdPatient: "",
  updateIpdPatient: "",
  deleteIpdPatient: "",
};

const IPDPatientSlice = createSlice({
  name: "IPDPatients",
  initialState,
  reducers: {
    getAllIPDPatients: (state, action) => {
      state.ipdPatients = action.payload;
    },
    createIpdPatientChange: (state, action) => {
      state.createIpdPatient = action.payload;
    },
    updateIpdPatientChange: (state, action) => {
      state.updateIpdPatient = action.payload;
    },
    deleteIpdPatientChange: (state, action) => {
      state.deleteIpdPatient = action.payload;
    },
  },
});

export const {
  getAllIPDPatients,
  createIpdPatientChange,
  updateIpdPatientChange,
  deleteIpdPatientChange,
} = IPDPatientSlice.actions;

export default IPDPatientSlice.reducer;
