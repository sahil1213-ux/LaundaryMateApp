import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";

// Step 2: Create a store and next we need to wrap our app with Provider
export default configureStore({
    reducer: {
        cart: CartReducer,
    },
});