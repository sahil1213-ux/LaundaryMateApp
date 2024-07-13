import { createSlice } from "@reduxjs/toolkit";
// Step 1: Create a slice
export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {

        addToCart: (state, action) => {
            const {item, category} = action.payload;
            const existingItemIndex = state.cart.findIndex((cartItem)=> cartItem.item.id === item.id);

            if (existingItemIndex !== -1) {
                // means item already exists in cart
                state.cart[existingItemIndex].quantity += 1;
            } else {
                // means item does not exist in cart
                state.cart.push({
                    item: {...item,quantity: 1},
                     category,
                    });
            }
        },

        incrementQuantity: (state, action) => {
            const itemPresent = state.cart.find((cartItem) => cartItem.item.id === action.payload.id.toString());
            if (itemPresent) {
                itemPresent.item.quantity += 1;
            }
        },


        decrementQuantity: (state, action) => {
            const itemPresent = state.cart.find((cartItem) => cartItem.item.id === action.payload.id.toString());
                if (itemPresent.item.quantity == 1) {
                    const removeItem = state.cart.filter((item) => item.item.id !== action.payload.id.toString());
                    state.cart = removeItem;
                } else {
                    itemPresent.item.quantity--;
                }
        },

        cleanCart: (state) => {
            state.cart = [];
        },

    },
});

export const { addToCart, incrementQuantity, decrementQuantity, cleanCart } = CartSlice.actions;
export default CartSlice.reducer;