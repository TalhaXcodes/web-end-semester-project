import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  statusTab: false,  // fixed typo from 'statusbar' to 'statusTab'
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(item => item.productId === productId);

      if (indexProductId >= 0) {  // fix: check if index >= 0, not indexProductId.ProductId
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
    },

    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(item => item.productId === productId);

      if (quantity > 0) {
        if (indexProductId >= 0) {  // make sure item exists before updating
          state.items[indexProductId].quantity = quantity;
        }
      } else {
        state.items = state.items.filter(item => item.productId !== productId);
      }
    },

    toggleStatusTab(state) {
      state.statusTab = !state.statusTab;
    },

    setCartItems(state, action) {
      state.items = action.payload;  // Replace the whole cart items array
    },
  },
});

export const { addToCart, changeQuantity, toggleStatusTab, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
