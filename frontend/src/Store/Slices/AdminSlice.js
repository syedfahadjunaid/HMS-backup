import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminLoggedIn: null,
  adminLoggedInData: null,
  adminRole: null,
  Admins: [],
  createAdmin: "",
  updateAdmin: "",
  deleteAdmin: "",
};

const AdminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    getAdminLoggedIn: (state, action) => {
      // localStorage.setItem("Admin", action.payload);
      state.adminLoggedIn = action.payload;
    },

    getAdminLoggedInData: (state, action) => {
      // localStorage.setItem("AdminData", JSON.stringify(action.payload));
      state.adminLoggedInData = action.payload;
    },
    getAdminRole: (state, action) => {
      // localStorage.setItem("AdminRole", action.payload);
      state.adminRole = action.payload;
    },
    getAllAdmins: (state, action) => {
      state.Admins = action.payload;
    },
    createAdminChange: (state, action) => {
      state.createAdmin = action.payload;
    },
    updateAdminChange: (state, action) => {
      state.updateAdmin = action.payload;
    },
    deleteAdminChange: (state, action) => {
      state.deleteAdmin = action.payload;
    },
  },
});

export const {
  getAdminLoggedIn,
  getAllAdmins,
  getAdminRole,
  createAdminChange,
  updateAdminChange,
  deleteAdminChange,
  getAdminLoggedInData,
} = AdminSlice.actions;

export default AdminSlice.reducer;
