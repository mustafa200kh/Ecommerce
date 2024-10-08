import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductByitems,
  changeCartQuantityByItemID,
  deleteFromCartByItemID,
  deleteAllCartItems,
  cleanUpProductFullInfo,
} from "@store/cart/cartSlice";

import { clearSuccessOnLeavingCartPage } from "@store/order/orderSlice";

export const useCart = () => {
  // to enable or disable delete all msg confirmation
  let [DeleteAllConfirmMsg, setDeleteAllConfimMsg] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { items, loading, error, productFullInfo } = useAppSelector(
    (state) => state.cart
  );

  const PlacingOrderLoading = useAppSelector((state) => state.order.loading);

  // prepare array of objects for the container component
  let cartProducts = productFullInfo.map((el) => {
    return { ...el, quantity: items[el.id] };
  });

  // Modifiy the Item quantity
  const changeCartQuantity = useCallback(
    (id: number, quantity: number) => {
      dispatch(changeCartQuantityByItemID({ id, quantity }));
    },
    [dispatch]
  );
  // Delete Specific Item
  const DeleteItem = useCallback(
    (id: number) => {
      dispatch(deleteFromCartByItemID(id));
    },
    [dispatch]
  );

  // Delete All Cart Item
  const DeleteAllItemsFromCart = useCallback(() => {
    dispatch(deleteAllCartItems());
  }, []);

  // to display delete all message or hide it depending on the state
  let MessageDisplay = !DeleteAllConfirmMsg ? "translate-x-full" : "";

  useEffect(() => {
    const promise = dispatch(actGetProductByitems());
    return () => {
      promise.abort();
      dispatch(cleanUpProductFullInfo());
      dispatch(clearSuccessOnLeavingCartPage());
    };
  }, []);
  return {
    loading,
    error,
    cartProducts,
    changeCartQuantity,
    DeleteItem,
    DeleteAllItemsFromCart,
    setDeleteAllConfimMsg,
    MessageDisplay,
    PlacingOrderLoading,
  };
};

export default useCart;
