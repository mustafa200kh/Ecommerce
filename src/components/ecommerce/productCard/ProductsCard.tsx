import { memo, useEffect, useState } from "react";
// redux
import { useAppDispatch } from "@store/hooks";
import { actLikeToogler } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";
// types
import { TProduct } from "@type/index";
// components
import { LikeSpinner, LoginRequiredMessage } from "@components/common";
import Spinner from "@components/common/loaders/Spinner";

// Svgs
import Heart from "@assets/heart-svgrepo-com.svg?react";
import HeartFilled from "@assets/heart-fill-svgrepo-com.svg?react";

const ProductsCard = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthorized,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    // Animating add to cart click operation

    let [isDisableBtn, setIsDisableBtn] = useState<boolean>(false);
    // Calculate the remaining items for user
    let remainQuantity = max - (quantity ?? 0);

    let [likeLoading, setLikeLoading] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);

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

    const likeTooglerHander = () => {
      if (isAuthorized) {
        // when the button is cliked and you are authorized we need to render loading
        setLikeLoading(true);
        dispatch(actLikeToogler(id))
          .unwrap() // wait the respond of dispatch
          .then(() => setLikeLoading(false))
          .catch(() => {
            // if somthing went wrong with the server we need to stop the loading
            setLikeLoading(false);
          });
      } else {
        // displaying the modal if not authorized (login)
        setShowModal(true);
      }
    };
    return (
      <>
        {/* Requiring login Message */}
        <div
          className={`fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-15 transition-all duration-200 ${
            !showModal && "-translate-y-full"
          }`}
        >
          <LoginRequiredMessage setLoginRequiredMessage={setShowModal} />
        </div>
        {/* card */}
        <div className="p-2 rounded-md overflow-hidden hover:scale-105 transition-all duration-200 cursor-pointer ">
          <div className="product-image relative">
            <span
              className="absolute flex items-center justify-center top-2 right-2 w-[30px] h-[30px] bg-white p-[1px] rounded-md hover:shadow-md transition-all duration-200"
              onClick={() => {
                if (likeLoading) {
                  return;
                }
                likeTooglerHander();
              }}
            >
              {likeLoading ? (
                <LikeSpinner />
              ) : isLiked ? (
                <HeartFilled />
              ) : (
                <Heart />
              )}
            </span>
            <div className="">
              <img
                src={img}
                alt={title}
                className="rounded-t-md min-h-[399px] mx-auto bg-[#eee]"
              />
            </div>
          </div>
          <div className="p-2">
            <div className="mb-4">
              <h3
                className="text-lighttext dark:text-white  capitalize text-lg truncate"
                title={title}
              >
                {title}
              </h3>
            </div>
            <div className="flex justify-between items-center mb-5">
              <p className="text-lighttext dark:text-white ">
                {remainQuantity == 0
                  ? "No items avaliable"
                  : `Remaining: ${remainQuantity}`}
              </p>
              <p className="text-lighttext dark:text-white ">{price}$</p>
            </div>
            <div>
              <button
                className="cursor-pointer w-full p-3 bg-hoverColor text-white rounded-lg shadow-lg transition-all duration-500"
                onClick={addToCartHandler}
                disabled={isDisableBtn}
              >
                {isDisableBtn ? (
                  <div className="flex justify-center items-center gap-1">
                    <Spinner />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ProductsCard;
