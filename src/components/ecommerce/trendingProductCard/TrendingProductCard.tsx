// react Hooks
import { memo, useEffect, useState } from "react";
// components
import Spinner from "@components/common/loaders/Spinner";
// types
import { TProduct } from "@type/tProduct.types";
// svgs
import ExpandSvg from "@assets/expand-svgrepo-com.svg?react";
import CartSvg from "@assets/cart-large-2-svgrepo-com.svg?react";
// redux hooks
import { useAppDispatch } from "@store/hooks";
// redux actions
import { addToCart } from "@store/cart/cartSlice";
import { Link } from "react-router-dom";

const TrendingProductCard = memo(
  ({ id, img, title, max, quantity, price }: TProduct) => {
    let dispatch = useAppDispatch();

    let [isDisableBtn, setIsDisableBtn] = useState<boolean>(false);

    let remainQuantity = max - (quantity ?? 0); // detecting how much quantity you can buy in every sinle purchase

    useEffect(() => {
      // If The button is not clicked
      if (!isDisableBtn) return;
      // else
      setIsDisableBtn(true);
      // After 300 ms return the value to original value
      const debounce = setTimeout(() => {
        setIsDisableBtn(false);
      }, 300);
      return () => {
        clearTimeout(debounce);
      };
    }, [isDisableBtn]);

    const addToCartHandler = () => {
      if (remainQuantity == 0) {
        setIsDisableBtn(true);
        return;
      }
      dispatch(addToCart(id));
      setIsDisableBtn(true);
    };

    return (
      <div
        key={id}
        className="relative group bg-white shadow rounded-xl overflow-hidden transition-all duration-200"
      >
        <img src={img} alt={title} className="w-full h-60 object-cover" />
        <div className="p-4 dark:bg-darktheme">
          <h3 className="text-lg font-medium dark:text-white">{title}</h3>
          <p className="text-lighttext dark:text-white ">
            {remainQuantity == 0
              ? "No items avaliable"
              : `Remaining: ${remainQuantity}`}
          </p>
          <p className="mt-2 text-primary font-semibold dark:text-white">
            {price.toLocaleString()} $
          </p>
        </div>

        {/* عند تمرير الماوس */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center 
  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-white text-sm"
        >
          <Link to={`/productDetails/${id}`} className="bg-white text-black px-4 py-2 rounded mb-2 flex items-center">
            <p className="inline-block">View</p>
            <ExpandSvg className="ml-2 w-3 h-3 inline-block" />
          </Link>
          <button
            className="bg-white text-black px-4 py-2 rounded mb-2 flex items-center"
            onClick={addToCartHandler}
            disabled={isDisableBtn}
          >
            {isDisableBtn ? (
              <div className="flex justify-center items-center gap-1">
                <Spinner />
                <span className="">Loading...</span>
              </div>
            ) : (
              <>
                <p className="inline-block">Add to Cart</p>
                <CartSvg className="ml-2 w-3 h-3 inline-block" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }
);

export default TrendingProductCard;
