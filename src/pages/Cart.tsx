import { Loading, LottieHandler } from "@components/feedback";
// components
import PageHeader from "@components/common/Heading/PageHeader";
import CartTotalPrice from "@components/ecommerce/cartTotalPrice/CartTotalPrice";
import { CartItemList, DeleteAllCartMessage } from "@components/common";
import useCart from "@hooks/useCart";

const Cart = () => {
  const {
    loading,
    error,
    cartProducts,
    changeCartQuantity,
    DeleteItem,
    DeleteAllItemsFromCart,
    setDeleteAllConfimMsg,
    MessageDisplay,
    PlacingOrderLoading,
  } = useCart();

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-20 z-30 transition-all delay-200 ${MessageDisplay}`}
      >
        <DeleteAllCartMessage
          setDeleteAllMsg={setDeleteAllConfimMsg}
          ActivateDeleteAllAction={DeleteAllItemsFromCart}
        />
      </div>
      <div className="flex items-center justify-between ">
        <PageHeader title="My Cart" />
        {cartProducts.length > 0 && (
          <div className="pr-3 md:pr-0">
            <button
              className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-105"
              onClick={() => {
                setDeleteAllConfimMsg(true);
              }}
            >
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
              Delete All
            </button>
          </div>
        )}
      </div>
      <Loading loading={loading} error={error} type="cart">
        {cartProducts.length == 0 ? (
          PlacingOrderLoading === "succeded" ? (
            loading !== "idle" && (
              <LottieHandler
                message="Your order has been placed successfuly"
                type="success"
              />
            )
          ) : (
            <LottieHandler message="Your cart is empty" type="empty" />
          )
        ) : (
          <>
            <CartItemList
              products={cartProducts}
              changeCartQuantity={changeCartQuantity}
              DeleteItem={DeleteItem}
            />
            <CartTotalPrice products={cartProducts} />
          </>
        )}
      </Loading>
    </>
  );
};

export default Cart;
