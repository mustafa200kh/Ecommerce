import { useEffect, useState } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders } from "@store/order/orderSlice";
// components
import { PageHeader } from "@components/common";
import { Loading } from "@components/feedback";
// svg
import CloseSvg from "@assets/Close.svg?react";
import { TProduct } from "@type/tProduct.types";

const Orders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<TProduct[]>([]);

  const { orders, error, loading } = useAppSelector((state) => state.order);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const viewDetailsHandler = (id: number) => {
    const order = orders.find((element) => element.id === id);
    const orderItems = order?.items ?? [];

    setSelectedOrder([...orderItems]);
    modalHandler();
  };
  return (
    <>
      {/* Modal */}
      <div
        className={`fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-15 transition-all duration-200 ${
          !showModal && "-translate-y-full"
        }`}
      >
        <div className="fixed shadow-md w-full md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white p-5 rounded-md">
          <div className="flex items-center justify-between pb-5">
            <h2 className="text-2xl"> Order Details </h2>
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
          <div className="max-h-[60vh] overflow-auto">
            <div className="py-2 flex items-center justify-between border-b-[1px] border-solid border-b-lighttext">
              <div className="basis-[20%]">Product-image</div>
              <div className="basis-[23%]">Deatils</div>
              <div className="basis-[18%]">Item-Price</div>
              <div className="basis-[15%]">Quantity</div>
              <div className="basis-[18%]">Total-Price</div>
            </div>
            {selectedOrder.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between border-b-[1px] border-solid border-b-lighttext"
              >
                <div className="basis-[20%]">
                  <img className="max-w-full" src={e.img} alt="product-img" />
                </div>
                <div className="basis-[20%]">{e.title}</div>
                <div className="basis-[20%]">{e.price}</div>
                <div className="basis-[15%]">{e.quantity}</div>
                <div className="basis-[18%]">
                  {e.quantity && e.quantity * e.price}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-[1px] border-solid border-t-lighttext">
            <button
              className="w-full bg-mainColor hover:bg-hoverColor text-white block p-2 mt-2 rounded-md"
              onClick={() => {
                modalHandler();
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      {/* page */}
      <div className="px-2">
        <PageHeader title="My Orders" />
        <Loading loading={loading} error={error} type={"cart"}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 mb-5">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium dark:text-white text-gray-500 uppercase"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium dark:text-white text-gray-500 uppercase"
                        >
                          Items
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium dark:text-white text-gray-500 uppercase"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium dark:text-white text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((el) => (
                        <tr
                          key={el.id}
                          className="odd:bg-white even:bg-gray-100 dark:odd:bg-darktheme dark:even:bg-darkthemeSec "
                        >
                          <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                            #{el.id}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                            Consist of {el.items.length} / Item(s)
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                            {el.subTotalPrice}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 hover:text-blue-800 focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                              onClick={() => viewDetailsHandler(el.id)}
                            >
                              Order Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    </>
  );
};

export default Orders;
