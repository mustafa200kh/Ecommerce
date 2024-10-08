import { Dispatch } from "react";

type TDeleteAllCartMessageProps = {
  setDeleteAllMsg: Dispatch<boolean>;
  ActivateDeleteAllAction: () => void;
};

const DeleteAllCartMessage = ({
  setDeleteAllMsg,
  ActivateDeleteAllAction,
}: TDeleteAllCartMessageProps) => {
  return (
    <div className="fixed select-none w-[80vw] md:w-[50vw] lg:w-[25vw] flex flex-col p-4 items-center justify-center bg-white shadow-lg rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="">
        <div className="text-center p-3 flex-auto justify-center">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            ></path>
          </svg>
          <h2 className="text-xl font-bold py-4">Delete All?</h2>
          <p className="font-bold text-gray-500 px-2">
            Do you really want to continue deleting all items from cart, This
            process cannot be undone
          </p>
        </div>
        <div className="p-2 mt-2 text-center space-x-8 md:block">
          <button
            className="btn-message bg-[#ddd] hover:bg-[#c5c5c5]"
            onClick={() => {
              setDeleteAllMsg(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn-message text-white bg-[#ff726d] hover:bg-red-600"
            onClick={() => {
              ActivateDeleteAllAction();
              setDeleteAllMsg(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAllCartMessage;
