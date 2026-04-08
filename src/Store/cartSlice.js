import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // 1. This part stays, but we try to "grab" existing data from the browser first
    items: JSON.parse(localStorage.getItem('amazone_cart')) || [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Keep your previous logic!
            state.items = [...state.items, action.payload];
            
            // ADD THIS: Save the new list to the browser memory
            localStorage.setItem('amazone_cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            let newBasket = [...state.items];

            if (index >= 0) {
                newBasket.splice(index, 1);
            }

            state.items = newBasket;
            
            // ADD THIS: Update the browser memory after removing an item
            localStorage.setItem('amazone_cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            // ADD THIS: Wipe the browser memory when the cart is cleared
            localStorage.removeItem('amazone_cart');
        }
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;