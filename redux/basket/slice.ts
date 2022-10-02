import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./type";

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (
      state: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.items.findIndex(
        (item: Product) => item._id === action.payload.id
      );
      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log(
          `Cant remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromBasket } = cartSlice.actions;

export default cartSlice.reducer;
