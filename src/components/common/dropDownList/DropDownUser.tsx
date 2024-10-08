// redux
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { signOutState } from "@store/auth/authSlice";

import ProfileSvg from "@assets/profile.svg?react";
import { NavLink, useNavigate } from "react-router-dom";

const DropDownUser = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  return (
    <div className="p-1 group hover:bg-slate-100 dark:hover:bg-darkthemeSec rounded-md relative hidden md:flex items-center gap-1 cursor-pointer">
      <div className="max-w-full">
        <ProfileSvg />
      </div>
      <div className="">
        <p className="dark:text-darktext">
          {user?.firstname} {user?.lastname}
        </p>
      </div>
      <div className="relative ml-1">
        <span className="absolute top-1/2 -translate-x-1/2 w-0 h-0 border-4 border-t-darktext border-l-transparent border-b-transparent border-r-transparent"></span>
      </div>
      <ul
        className={`scale-0 w-0 top-0 group-hover:scale-100 group-hover:w-[120px] group-hover:top-full transition-all duration-400 absolute p-3 text-center right-[-12px] bg-lighttheme dark:bg-darktheme `}
      >
        <NavLink
          className="p-1 mb-1 block hover:bg-slate-100 dark:hover:bg-darkthemeSec text-darktext"
          to="profile"
          end
        >
          Profile
        </NavLink>
        <NavLink
          className="p-1 mb-1 block hover:bg-slate-100 dark:hover:bg-darkthemeSec text-darktext"
          to="profile/order"
          end
        >
          Orders
        </NavLink>
        <li
          className="p-1 hover:bg-slate-100 dark:hover:bg-darkthemeSec text-darktext"
          onClick={() => {
            dispatch(signOutState());
            navigate("/");
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default DropDownUser;
