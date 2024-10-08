import { useEffect } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetOrders,
  clearSuccessOnLeavingCartPage,
} from "@store/order/orderSlice";
import {
  actGetWishList,
  cleanUpwishlistProductFullInfo,
} from "@store/wishlist/wishlistSlice";
// compoenents
import { PageHeader } from "@components/common";
//images
import profilePic from "@assets/images/profilePic.jpg";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actGetWishList("productFullInfo"));
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(cleanUpwishlistProductFullInfo());
      dispatch(clearSuccessOnLeavingCartPage());
    };
  }, [dispatch]);

  const myOrdersCount = useAppSelector((state) => state.order.orders.length);
  const wishlistCount = useAppSelector(
    (state) => state.wishlist.wishlistProductFullInfo.length
  );
  return (
    <div className="w-full">
      <PageHeader title={`Hello, Sir`} />
      <div className="mx-auto text-center">
        <div className="relative h-[200px] mb-2">
          <img
            src={profilePic}
            alt="Profile-Image"
            className="w-[200px] h-[200px] rounded-full absolute left-1/2 -translate-x-1/2"
          />
        </div>
        <div className="w-full mb-5">
          <p className=" text-2xl text-lighttext dark:text-white">
            {" "}
            {user?.firstname.toUpperCase()} {user?.lastname.toUpperCase()}
          </p>
          <p className="dark:text-slate-300"> {user?.email}</p>
        </div>
        <hr className="w-1/2 relative left-1/2 -translate-x-1/2" />
        <div className="flex items-center justify-center p-3">
          <div className="border-r-[1px] border-solid border-r-[#ddd] font-semibold px-3">
            <p className="dark:text-white">Orders</p>
            <p className="dark:text-white">{myOrdersCount}</p>
          </div>

          <div className="px-3 font-semibold">
            <p className="dark:text-white">Wishlist</p>
            <p className="dark:text-white">{wishlistCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
