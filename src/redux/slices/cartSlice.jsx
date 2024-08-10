import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // Initial state of the cart

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer to add an item to the cart
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If item is already in the cart, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If item is not in the cart, add it with a quantity of 1
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    // Reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem.quantity > 1) {
        // If more than one of the item is in the cart, decrease its quantity
        existingItem.quantity -= 1;
      } else {
        // If only one of the item is in the cart, remove it completely
        return state.filter((item) => item.id !== action.payload.id);
      }
    },
  },
});

// Exporting the actions to add and remove items from the cart
export const { addToCart, removeFromCart } = cartSlice.actions;

// Exporting the reducer as default.
export default cartSlice.reducer;
