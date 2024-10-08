import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// css modules
import style from "./style.module.css";
type TRightIconHeaderProps = {
  myCount: number;
  icon: ReactNode;
  path: string;
  border: boolean;
};
const RightIconHeader = ({
  myCount,
  icon,
  path,
  border,
}: TRightIconHeaderProps) => {
  const { count } = style;

  let navigate = useNavigate();

  let [animation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    // we will listen up on total quantity(state)
    // when its chagnage we will animate the element
    if (myCount === 0) {
      return;
    }
    setAnimation(true);
    // time of the animation to setAnimation to false
    let debounce = setTimeout(() => {
      setAnimation(false);
    }, 300);
    return () => {
      // clearing timming interval
      clearInterval(debounce);
    };
  }, [myCount]);

  // if the value of animation is true so apply the custom tailwindcss class to the element
  let cartNumberAnimation = animation && "animate-myPing";
  return (
    <div
      className={`ml-2 p-2 cursor cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-500 rounded-full relative ${
        border && "border-r-[1px] border-solid border-r-lighttext"
      }`}
      onClick={() => navigate(`${path}`)}
    >
      {icon}
      {myCount > 0 && (
        <span
          className={`${count} bg-mainColor text-white ${cartNumberAnimation}`}
        >
          {myCount}
        </span>
      )}
    </div>
  );
};

export default RightIconHeader;
