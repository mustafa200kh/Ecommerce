import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrfix,
  cleanProductsRecords,
} from "@store/products/productsSlice";

const useProducts = () => {
  const params = useParams();
  const paramsPrefix = params.prefix;
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);

  const { accessToken } = useAppSelector((state) => state.auth);
  // bringing the items in the cart
  const cartItems = useAppSelector((state) => state.cart.items);

  // bring the wishlist items array of id
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsID);

  useEffect(() => {
    const payload = params.prefix as string;
    const promise = dispatch(actGetProductsByCatPrfix(payload));

    return () => {
      promise.abort();
      dispatch(cleanProductsRecords());
    };
  }, [dispatch, paramsPrefix]);

  // Appending quantity od each element to it
  let fullData = records.map((el) => {
    return {
      ...el,
      quantity: cartItems[el.id],
      isLiked: wishlistItemsId.includes(el.id), // see if id exixst in wishlist id we will set calue to true else to false
      isAuthorized: accessToken ? true : false,
    };
  });

  return { loading, error, fullData, paramsPrefix };
};

export default useProducts;
