import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billings: [],
  createBilling: "",
  updateBilling: "",
  deleteBilling: "",
};

const billingSlice = createSlice({
  name: "billings",
  initialState,
  reducers: {
    getAllBillings: (state, action) => {
      state.billings = action.payload;
    },
    createBillingChange: (state, action) => {
      state.createBilling = action.payload;
    },
    updateBillingChange: (state, action) => {
      state.updateBilling = action.payload;
    },
    deleteBillingChange: (state, action) => {
      state.deleteBilling = action.payload;
    },
  },
});

export const {
  getAllBillings,
  createBillingChange,
  updateBillingChange,
  deleteBillingChange,
} = billingSlice.actions;

export default billingSlice.reducer;
