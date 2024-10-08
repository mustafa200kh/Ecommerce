// components
import { RightIconHeader } from "@components/ecommerce";
// hooks
import useTheme from "@hooks/useTheme";
// Redux
import { useAppSelector } from "@store/hooks";
import { GetTotalQuantitySelector } from "@store/cart/cartSlice";
// Svgs
import CartIcon from "@assets/icon-cart-light.svg?react";
import CartIconDark from "@assets/icon-cart-darkMode.svg?react";
import WishlistICon from "@assets/book-saved-svgrepo-com.svg?react";
import WishlistIConDark from "@assets/book-saved-svgrepo-com-darkMode.svg?react";
import SunIcon from "@assets/sunIcon.svg?react";
import MoonIcon from "@assets/moon-svgrepo-com.svg?react";

// the purpose of this component to contains the left icons in the header (wishlist, cart) to avoid
// multi re-rendering for all header when state change in on of them so just this component will reReder again
const HeaderLeftSection = () => {
  const wishlistIDs = useAppSelector((state) => state.wishlist.itemsID);
  const cartCount = useAppSelector(GetTotalQuantitySelector);

  let { darkTheme, setDarkTheme } = useTheme();

  return (
    <>
      <div className=" hidden md:flex items-center">
        <RightIconHeader
          icon={darkTheme ? <WishlistIConDark /> : <WishlistICon />}
          path="/wishlist"
          myCount={wishlistIDs.length}
          border={false}
        />
        <RightIconHeader
          icon={darkTheme ? <CartIconDark /> : <CartIcon />}
          path="/cart"
          myCount={cartCount}
          border={false}
        />
        {darkTheme ? (
          <div
            className="ml-2 p-2 rounded-full hover:bg-slate-100 hover:dark:bg-slate-500"
            onClick={() => setDarkTheme(false)}
          >
            <SunIcon />
          </div>
        ) : (
          <div
            className="ml-2 p-2 rounded-full hover:bg-slate-100 hover:dark:bg-slate-500"
            onClick={() => setDarkTheme(true)}
          >
            <MoonIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderLeftSection;
