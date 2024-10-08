// components
import { RightIconHeader } from "@components/ecommerce";
import LoginBtn from "../buttons/LoginBtn";
import RegisterBtn from "../buttons/RegisterBtn";

// custom hook
import useTheme from "@hooks/useTheme";
// Redux
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { GetTotalQuantitySelector } from "@store/cart/cartSlice";

// Svgs
import CloseIcon from "@assets/Close.svg?react";
import CartIcon from "@assets/icon-cart-light.svg?react";
import CartIconDark from "@assets/icon-cart-darkMode.svg?react";
import WishlistICon from "@assets/book-saved-svgrepo-com.svg?react";
import WishlistIConDark from "@assets/book-saved-svgrepo-com-darkMode.svg?react";
import SunIcon from "@assets/sunIcon.svg?react";
import MoonIcon from "@assets/moon-svgrepo-com.svg?react";
import ProfileIcon from "@assets/profile.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { signOutState } from "@store/auth/authSlice";

type SideMenuProps = {
  visible: boolean;
  sideMenuToggler: () => void;
};
const SideMenu = ({ visible, sideMenuToggler }: SideMenuProps) => {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const wishlistIDs = useAppSelector((state) => state.wishlist.itemsID);

  const cartCount = useAppSelector(GetTotalQuantitySelector);

  let { darkTheme, setDarkTheme } = useTheme();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  return (
    <div
      className={`fixed z-50 top-0 right-0 w-1/2 h-screen bg-[#FFF] dark:bg-darkthemeSec p-4 ${
        !visible ? "translate-x-full" : "translate-x-0"
      } transition-all duration-200`}
    >
      <div className="w-fit mb-5" onClick={() => sideMenuToggler()}>
        <CloseIcon />
      </div>
      <div className="">
        {accessToken && (
          <>
            <div className="flex flex-col items-center mb-5">
              <div>
                <ProfileIcon style={{ width: "100px", height: "100px" }} />
              </div>
              <div className="">
                <p className="dark:text-darktext">
                  {user?.firstname} {user?.lastname}
                </p>
              </div>
            </div>

            <div className="">
              <Link
                className="mb-1 py-1 block dark:text-white"
                to="profile"
                onClick={() => sideMenuToggler()}
              >
                Profile
              </Link>
            </div>
            <div className="">
              <Link
                className="mb-1 py-1 block dark:text-white"
                to="profile/order"
                onClick={() => sideMenuToggler()}
              >
                Orders
              </Link>
            </div>
            <div
              className=""
              onClick={() => {
                dispatch(signOutState());
                navigate("/");
                sideMenuToggler();
              }}
            >
              <p className="mb-1 py-1 dark:text-white">Logout</p>
            </div>
          </>
        )}

        <div
          className="flex items-center justify-between"
          onClick={() => {
            sideMenuToggler();
            navigate("/wishlist");
          }}
        >
          <p className="dark:text-white"> Wishlist </p>
          <RightIconHeader
            icon={darkTheme ? <WishlistIConDark /> : <WishlistICon />}
            path="/wishlist"
            myCount={wishlistIDs.length}
            border={false}
          />
        </div>
        <div
          className="flex items-center justify-between"
          onClick={() => {
            sideMenuToggler();
            navigate("/cart");
          }}
        >
          <p className="dark:text-white"> My Cart </p>
          <RightIconHeader
            icon={darkTheme ? <CartIconDark /> : <CartIcon />}
            path="/cart"
            myCount={cartCount}
            border={false}
          />
        </div>

        <div
          className="flex items-center justify-between mb-5"
          onClick={() => setDarkTheme(!darkTheme)}
        >
          {darkTheme ? (
            <>
              <p className="dark:text-white"> Light Mode </p>
              <div className="ml-2 p-2 rounded-full hover:bg-slate-100 hover:dark:bg-slate-500">
                <SunIcon />
              </div>
            </>
          ) : (
            <>
              <p className="dark:text-white"> Dark Mode</p>
              <div className="ml-2 p-2 rounded-full hover:bg-slate-100 hover:dark:bg-slate-500">
                <MoonIcon />
              </div>
            </>
          )}
        </div>
        {!accessToken && (
          <>
            <div className="mb-3" onClick={() => sideMenuToggler()}>
              <RegisterBtn />
            </div>
            <div className="mb-3" onClick={() => sideMenuToggler()}>
              <LoginBtn />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
