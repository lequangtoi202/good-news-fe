import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminDeleteStatus: false,
  },
  reducers: {
    deleteAny: (state, action) => {
      state.adminDeleteStatus = action.payload;
    },
    resetDeleteStatus: (state) => {
      state.adminDeleteStatus = false;
    },
  },
});

export const { deleteAny, resetDeleteStatus } = adminSlice.actions;

export default adminSlice.reducer;
