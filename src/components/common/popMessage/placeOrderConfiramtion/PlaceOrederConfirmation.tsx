// Svgs
import CloseSvg from "@assets/Close.svg?react";
type TPlaceOrederConfirmation = {
  loading: boolean;
  error: string | null;
  modalHandler: () => void;
  placingOrderHandler: () => void;
  totalPrice: number;
};
const PlaceOrederConfirmation = ({
  error,
  loading,
  modalHandler,
  placingOrderHandler,
  totalPrice,
}: TPlaceOrederConfirmation) => {
  return (
    <>
      <div className="fixed shadow-md w-[300px] md:w-[500px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl"> Placing Order Confirmation </h2>
          <div
            className="cursor-pointer"
            onClick={() => {
              modalHandler();
            }}
          >
            <CloseSvg />
          </div>
        </div>
        <hr className="mb-5" />
        <p className="mb-5">
          Are you sure you want to place the order with subTotal:
          {totalPrice.toFixed(2)}$
        </p>
        {/* if the order cannot be placed this mean no loading and there is error*/}
        {!loading && error && <p className="mb-5 text-red-600">{error}</p>}
        <hr className="mb-2" />
        <div className="flex items-center justify-end gap-5">
          <button
            className="block p-2 rounded-md bg-[#ddd] hover:bg-[#c5c5c5]"
            onClick={() => {
              modalHandler();
            }}
          >
            Close
          </button>
          <button
            className="bg-mainColor hover:bg-hoverColor text-white block p-2 rounded-md"
            onClick={() => {
              placingOrderHandler();
            }}
          >
            {loading ? "loading..." : "Place Order"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrederConfirmation;
