import Lottie from "lottie-react";

import CartLoading from "@assets/Lotties/CartLoading.json";
import Empty from "@assets/Lotties/Empty.json";
import Error from "@assets/Lotties/Error.json";
import Loading from "@assets/Lotties/Loading-eCommerceApp.json";
import Network from "@assets/Lotties/NetWorkError.json";
import LoginLottie from "@assets/Lotties/LoginAnimation.json";
import Success from "@assets/Lotties/success.json";

const lottieTypes = {
  login: LoginLottie,
  cartload: CartLoading,
  empty: Empty,
  error: Error,
  loading: Loading,
  network: Network,
  success: Success,
};

type TLottieHandlerProps = {
  message?: string;
  type: keyof typeof lottieTypes;
  color?: string;
  size?: "sm" | "lg";
};

const LottieHandler = ({ message, type, color, size }: TLottieHandlerProps) => {
  const AnimationLottie = lottieTypes[type];
  const errorMessageColor = color === "red" ? "text-red-600" : "";
  return (
    <div className="flex justify-center items-center">
      <div>
        {size === "sm" ? (
          <Lottie
            animationData={AnimationLottie}
            loop={true}
            style={{ width: "150px", marginBottom: "20px" }}
          />
        ) : (
          <Lottie
            animationData={AnimationLottie}
            loop={true}
            style={{ width: "300px", marginBottom: "20px" }}
          />
        )}

        {message && (
          <h5
            className={`mb-5 flex justify-center dark:text-white font-semibold ${errorMessageColor}`}
          >
            {message}
          </h5>
        )}
      </div>
    </div>
  );
};

export default LottieHandler;
