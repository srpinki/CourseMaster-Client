import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/lib/axios";

// ======================
// Fetch all courses
// ======================
export const fetchAdminCourses = createAsyncThunk(
  "adminCourses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================
// Fetch single course (for Edit)
// ======================
export const fetchAdminCourseById = createAsyncThunk(
  "adminCourses/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================
// Update course
// ======================
export const updateAdminCourse = createAsyncThunk(
  "adminCourses/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(`/admin/courses/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================
// Delete course
// ======================
export const deleteAdminCourse = createAsyncThunk(
  "adminCourses/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================
// Slice
// ======================
const adminCourseSlice = createSlice({
  name: "adminCourses",
  initialState: {
    list: [],
    single: null,
    status: "idle",
    singleStatus: "idle",
    updateStatus: "idle",
    error: null,
  },
  reducers: {
    clearSingleCourse: (state) => {
      state.single = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======================
      // Fetch all
      // ======================
      .addCase(fetchAdminCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminCourses.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchAdminCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ======================
      // Fetch single
      // ======================
      .addCase(fetchAdminCourseById.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchAdminCourseById.fulfilled, (state, action) => {
        state.singleStatus = "success";
        state.single = action.payload;
      })
      .addCase(fetchAdminCourseById.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.error = action.payload;
      })

      // ======================
      // Update course
      // ======================
      .addCase(updateAdminCourse.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateAdminCourse.fulfilled, (state) => {
        state.updateStatus = "success";
      })
      .addCase(updateAdminCourse.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })

      // ======================
      // Delete
      // ======================
      .addCase(deleteAdminCourse.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export const { clearSingleCourse } = adminCourseSlice.actions;
export default adminCourseSlice.reducer;
