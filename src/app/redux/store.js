// src/app/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

// Import slices 
import authReducer from "./slice/authSlice";
import studentReducer from "./slice/studentSlice";
import adminReducer from "./slice/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    admin: adminReducer,
  },
});

export default store;
