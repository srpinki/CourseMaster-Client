import api from "@/app/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// fetch all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (params) => {
    const res = await api.get("/courses", { params });
    return res.data; // Axios returns data in res.data
  }
);

// fetch single course by ID
export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id) => {
    const res = await api.get(`/courses/${id}`);
    return res.data;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    course: null,
    total: 0,
    page: 1,
    totalPages: 1,
    filters: { search: "", category: "", sort: "price_asc" },
    status: "idle",
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => { state.status = "loading"; })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.courses;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCourses.rejected, (state) => { state.status = "failed"; })
      .addCase(fetchCourseById.pending, (state) => { state.status = "loading"; })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state) => { state.status = "failed"; });
  },
});

export const { setFilters, setPage } = courseSlice.actions;
export default courseSlice.reducer;
