// react
import { Dispatch } from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";
// SVGS
import CloseSvg from "@assets/Close.svg?react";

type TLoginRequiredMessageProps = {
  setLoginRequiredMessage: Dispatch<boolean>;
};
const LoginRequiredMessage = ({
  setLoginRequiredMessage,
}: TLoginRequiredMessageProps) => {
  let navigate = useNavigate();
  return (
    <>
      <div className="fixed shadow-md w-[300px] md:w-[500px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white p-5 rounded-md">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl">Login Requried! </h2>
          <div
            className="cursor-pointer"
            onClick={() => {
              setLoginRequiredMessage(false);
            }}
          >
            <CloseSvg />
          </div>
        </div>
        <hr className="mb-5" />
        <p className="mb-5">
          Sorry! to make reaction and save it for next time you have to be
          logged in
        </p>
        <hr className="mb-2" />
        <button
          className="bg-mainColor hover:bg-hoverColor text-white block p-2 rounded-md ml-auto"
          onClick={() => {
            setLoginRequiredMessage(false);
            navigate("/login");
          }}
        >
          Login Now
        </button>
      </div>
    </>
  );
};

export default LoginRequiredMessage;
