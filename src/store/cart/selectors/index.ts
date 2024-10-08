import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
const GetTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items, // will see if the new state equal to old state it will do nothing else invoke the logic
  (items) => {
    //logic
    const cartCount = Object.values(items).reduce(
      (accumlator, currentValue) => accumlator + currentValue,
      0
    );
    return cartCount;
  }
);

export { GetTotalQuantitySelector };
