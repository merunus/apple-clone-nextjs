import { RootState } from "../store";

export const selectCartData = (state: RootState) => state.cart;

export const selectCartItemsWithId = (state: RootState, id: string) =>
  state.cart.items.filter((item) => item._id === id);

export const selectBasketTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: Product) => (total += item.price),
    0
  );
