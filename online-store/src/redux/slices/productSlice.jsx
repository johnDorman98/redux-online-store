import { createSlice } from "@reduxjs/toolkit";

// Import images
import product1Image from "../../assets/1.jpg";
import product2Image from "../../assets/2.jpg";
import product3Image from "../../assets/3.jpg";
import product4Image from "../../assets/4.jpg";
import product5Image from "../../assets/5.jpg";

// Initial state with a list of products, each with an image
const initialState = [
  {
    id: 1,
    name: "Artisan coffee, number 1",
    description: "A lovingly coffee with stacked hearts in the foam",
    price: 50,
    image: product1Image,
  },
  {
    id: 2,
    name: "Coffee in the making",
    description: "A lovingly crafted coffee being designed",
    price: 60,
    image: product2Image,
  },
  {
    id: 3,
    name: "Simple coffee",
    description: "For those wo want some simple, yet delicious coffee",
    price: 35,
    image: product3Image,
  },
  {
    id: 4,
    name: "Cocoa hearts",
    description: "If coffee is not your thing, try our cocoa hearts hot chocolate",
    price: 45,
    image: product4Image,
  },
  {
    id: 5,
    name: "Freshly brewed, antique ground coffee",
    description: "For those who want to taste the past",
    price: 75,
    image: product5Image,
  },
];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

// Exporting the reducer as default
export default productsSlice.reducer; 
