import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        filter: filterSlice,
        // You can add an 'orders' slice here later!
    }
});

export default store;