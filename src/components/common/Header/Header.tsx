import { useEffect, useState } from "react";
// Redux
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetWishList } from "@store/wishlist/wishlistSlice";
// React Router dom
import { NavLink } from "react-router-dom";

// components
import LoginBtn from "@components/common/buttons/LoginBtn";
import RegisterBtn from "@components/common/buttons/RegisterBtn";
import { HeaderLeftSection, DropDownUser } from "@components/common/index";
import Logo from "../Logo/Logo";
import SideMenu from "../SideMenu/SideMenu";

import MenuLightIcon from "@assets/menu-light-icon.svg?react";

function Header() {
  const { accessToken } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  let [sideMenuVisible, setSideMenuVisible] = useState<boolean>(false);

  const sideMenuToggler = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishList("productIDs"));
    }
  }, [dispatch, accessToken]);

  return (
    <div className="container sticky top-0 z-30 bg-white dark:bg-darkthemeSec">
      <div className="line-1 py-5 md:py-3 flex justify-between items-center bg-inherit">
        {/* website Logo */}
        <Logo />
        {/* header search and cart btn  */}
        <div className="buttons flex">
          <HeaderLeftSection />
          {/* side menu for small screens */}
          <div className="md:hidden">
            <div className="px-3" onClick={() => sideMenuToggler()}>
              <MenuLightIcon />
            </div>
          </div>
        </div>
      </div>
      {/* Header side Menu */}

      <SideMenu visible={sideMenuVisible} sideMenuToggler={sideMenuToggler} />

      {/* header links */}
      <div className="flex justify-between items-center p-3 bg-lighttheme dark:bg-darktheme">
        <div className="mx-auto md:mx-0">
          <ul className="flex gap-4 md:gap-6 text-white dark:text-darktext">
            <NavLink
              className="hover:bg-hoverColor hover:text-white py-1 px-2 rounded-md text-darktext"
              to="/"
            >
              Home
            </NavLink>
            {/* <NavLink
              className="hover:bg-hoverColor hover:text-white py-1 px-2 rounded-md text-lighttext"
              to="categories/products/men"
            >
              Products
            </NavLink> */}
            <NavLink
              className="hover:bg-hoverColor hover:text-white py-1 px-2 rounded-md text-darktext"
              to="/categories"
            >
              Categories
            </NavLink>
            <NavLink
              className="hover:bg-hoverColor hover:text-white py-1 px-2 rounded-md text-darktext"
              to="/contactus"
            >
              ContactUs
            </NavLink>
          </ul>
        </div>
        {!accessToken ? (
          <div className="hidden md:flex items-center gap-5">
            <div>
              <LoginBtn />
            </div>
            <div>
              <RegisterBtn />
            </div>
          </div>
        ) : (
          <DropDownUser />
        )}
      </div>
    </div>
  );
}

export default Header;
