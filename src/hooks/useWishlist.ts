import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishList,
  cleanUpwishlistProductFullInfo,
} from "@store/wishlist/wishlistSlice";
const useWishlist = () => {
  let dispatch = useAppDispatch();

  // get the products full data in the wishlist
  const { wishlistProductFullInfo, error, loading } = useAppSelector(
    (state) => state.wishlist
  );

  // bringing the items in the cart
  const cartItems = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    const promise = dispatch(actGetWishList("productFullInfo"));

    return () => {
      promise.abort();
      dispatch(cleanUpwishlistProductFullInfo());
    };
  }, [dispatch]);

  // Appending quantity od each element to it
  let fullData = wishlistProductFullInfo.map((el) => {
    return {
      ...el,
      quantity: cartItems[el.id],
      isLiked: true, // see if id exixst in wishlist id we will set calue to true else to false
      isAuthorized: true,
    };
  });

  return { error, loading, fullData, wishlistProductFullInfo };
};

export default useWishlist;
