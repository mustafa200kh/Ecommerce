import { DeleteConfirmationMessage } from "@components/common";
import { TProduct } from "@type/index";
import { useState } from "react";

type TCartItem = TProduct & {
  changeCartQuantity: (id: number, quantity: number) => void;
  DeleteItem: (id: number) => void;
};

const CartItem = ({
  img,
  id,
  max,
  quantity,
  price,
  title,
  changeCartQuantity,
  DeleteItem,
}: TCartItem) => {
  // to activate and deativate the delete message question
  let [deleteMessage, setDeleteMessage] = useState<boolean>(false);

  //Render Selecet For each cart Item
  const numberOfOptions = Array(max).fill(0); // for eample if the max =3 we create array of let 3 filled with zeros
  const optionsArray = numberOfOptions.map((_, index) => {
    return ++index;
  }); // each place in the array will filled with the value of index + 1

  // Now After we got the options we will Render the select Options
  const selectOtions = optionsArray.map((el) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  // change quantity handler for each item in cart
  const changeQuantityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const elementQuantity = +e.target.value; // makes sure that the quantity is number
    const elementID = id;
    changeCartQuantity(elementID, elementQuantity);
  };

  // RenderDelete Message
  const RenderDeleteMessage = deleteMessage ? "scale-1" : "scale-0";
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-40 z-30 transition-all duration-300 ${RenderDeleteMessage}`}
      >
        <DeleteConfirmationMessage
          id={id}
          title={title}
          settingDeleteMessage={setDeleteMessage}
          DeleteItem={DeleteItem}
        />
      </div>
      <div className="p-3 flex flex-col md:flex-row gap-2 border-b-[1px] border-[#ddd] border-solid">
        <div className="md:basis-1/5">
          <img className="md:h-52" src={img} alt={title} />
        </div>
        <div className="flex-1 flex md:flex-col justify-between items-center md:items-start dark:text-white">
          <div className="p-3">
            <h3 className="text-xl">{title}</h3>
            <span className="block"> {price.toFixed(2)}$</span>
          </div>
          <div className="p-3">
            <button
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
              onClick={() => setDeleteMessage((prev) => !prev)}
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
              Delete
            </button>
          </div>
        </div>
        <div className="md:basis-1/5 self-center dark:text-white">
          <h2 className="mb-2 text-lg"> Quantity</h2>
          <select
            className="p-1 w-full md:w-14 border-solid border-2 dark:bg-darktext dark:border-white dark:outline-none border-black focus:border-mainColor rounded-md"
            value={quantity}
            onChange={(e) => changeQuantityHandler(e)}
          >
            {selectOtions}
          </select>
        </div>
      </div>
    </>
  );
};

export default CartItem;
