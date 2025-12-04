import { createSlice } from "@reduxjs/toolkit";

// SAFE localStorage reader (SSR compatible)
let userFromStorage = null;
let tokenFromStorage = null;

if (typeof window !== "undefined") {
  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    userFromStorage =
      storedUser && storedUser !== "undefined" && storedUser !== "null"
        ? JSON.parse(storedUser)
        : null;

    tokenFromStorage =
      storedToken && storedToken !== "undefined" && storedToken !== "null"
        ? storedToken
        : null;
  } catch (error) {
    console.error("LocalStorage parse error:", error);
    userFromStorage = null;
    tokenFromStorage = null;
  }
}

const initialState = {
  user: userFromStorage,
  accessToken: tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user || null;
      state.accessToken = accessToken || null;

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("user", user ? JSON.stringify(user) : "null");
          localStorage.setItem("token", accessToken || "");
        } catch (error) {
          console.error("Failed to save to localStorage:", error);
        }
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;

      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } catch (error) {
          console.error("Failed to clear localStorage:", error);
        }
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
