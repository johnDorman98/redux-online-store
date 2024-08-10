import { createSlice } from "@reduxjs/toolkit";

// Initial state with a current user set to null and a list of registered users
const initialState = {
  currentUser: null, // No user is logged in initially
  users: [
    {
      id: 1,
      firstName: "First name",
      lastName: "Last name",
      username: "Username",
      email: "Username@gmail.com",
      password: "password",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer for registering a new user
    register: (state, action) => {
      state.users.push(action.payload); // Add the new user to the users array
    },
    // Reducer for logging in a user
    login: (state, action) => {
      state.currentUser = action.payload; // Set the currentUser to the logged-in user
    },
    // Reducer for logging out the current user
    logout: (state) => {
      state.currentUser = null; // Reset the currentUser to null
    },
  },
});

// Exporting the actions to register, login, and logout
export const { register, login, logout } = userSlice.actions;

// Exporting the reducer as default
export default userSlice.reducer;
