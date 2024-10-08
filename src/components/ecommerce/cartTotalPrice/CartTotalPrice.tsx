// react
import { useState } from "react";
//components
import { PlaceOrederConfirmation } from "@components/common/index";
// types
import { TProduct } from "@type/index";
// redux
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actPlaceOrder } from "@store/order/orderSlice";
import { deleteAllCartItems } from "@store/cart/cartSlice";

type TCartTotalPriceProps = {
  products: TProduct[];
};

const CartTotalPrice = ({ products }: TCartTotalPriceProps) => {
  const dispatch = useAppDispatch();

  // viewing modal or not
  const [showModal, setShowModal] = useState<boolean>(false);
  // loading state
  const [loading, setLoading] = useState<boolean>(false);
  //error state
  const [error, setError] = useState<string | null>(null);

  // getting the acess token to check it later
  const { accessToken } = useAppSelector((state) => state.auth);

  // intialize dispatch

  // calculating the total price
  let totalPrice = products.reduce((accumlator, element) => {
    let quantity = element.quantity;
    let price = element.price;
    if (quantity && typeof quantity === "number") {
      return accumlator + price * quantity;
    } else {
      return accumlator;
    }
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const placingOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        setShowModal(false);
        dispatch(deleteAllCartItems());
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div
        className={`fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-15 transition-all duration-200 ${
          !showModal && "-translate-y-full"
        }`}
      >
        <PlaceOrederConfirmation
          loading={loading}
          error={error}
          modalHandler={modalHandler}
          placingOrderHandler={placingOrderHandler}
          totalPrice={totalPrice}
        />
      </div>
      <div className="flex justify-between items-center p-3">
        <h3 className="text-lg font-semibold dark:text-white">
          SubTotal Price:
        </h3>
        <p className="text-lg font-semibold dark:text-white">
          {" "}
          {totalPrice.toFixed(2)}$
        </p>
      </div>
      {accessToken && (
        <div className="w-full p-3">
          <button
            className="btn-primary text-white bg-mainColor hover:bg-hoverColor border-mainColor hover:border-hoverColor hover:scale-105 block ml-auto"
            onClick={() => {
              modalHandler();
            }}
          >
            PlaceOrder
          </button>
        </div>
      )}
    </>
  );
};

export default CartTotalPrice;
