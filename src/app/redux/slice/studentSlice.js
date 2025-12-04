"use client";
import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    courses: [],         // Student's enrolled courses
    assignments: [],     // Student's assignments
    profile: null,       // Optional: student profile info
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearStudentData: (state) => {
      state.courses = [];
      state.assignments = [];
      state.profile = null;
    },
  },
});

export const { setCourses, setAssignments, setProfile, clearStudentData } = studentSlice.actions;
export default studentSlice.reducer;
