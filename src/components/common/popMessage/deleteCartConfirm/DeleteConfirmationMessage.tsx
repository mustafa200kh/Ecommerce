import { Dispatch } from "react";

type TDeleteMessageProps = {
  id: number;
  title: string;
  settingDeleteMessage: Dispatch<boolean>;
  DeleteItem: (id: number) => void;
};

const DeleteConfirmationMessage = ({
  id,
  title,
  settingDeleteMessage,
  DeleteItem,
}: TDeleteMessageProps) => {
  const deleteWithIDHandler = () => {
    // calling delete in cart componnet to Delete the Item By ID
    DeleteItem(id);
  };
  return (
    <div className="w-[80vw] md:w-[50vw] lg:w-[25vw] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-40 p-7 bg-white text-center rounded-lg shadow-md">
      <h2 className="text-xl mb-5"> Delete Item ?</h2>
      <p className=" mb-5">
        Are you sure you want to delete ({title}) From Your cart?
      </p>
      <div className="flex items-center justify-center gap-8 text-lg">
        <button
          className="btn-message bg-[#ddd] hover:bg-[#c5c5c5]"
          onClick={() => {
            settingDeleteMessage(false);
          }}
        >
          Cancel
        </button>
        <button
          className="btn-message text-white bg-[#ff726d] hover:bg-red-600"
          onClick={() => {
            settingDeleteMessage(false);
            deleteWithIDHandler();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationMessage;
