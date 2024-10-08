import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="wrapper grid grid-cols-4 gap-2 mt-2">
      <section className="hidden col-span-1 pt-2 md:block">
        <div className="sidemenu flex flex-col rounded-md border border-solid border-[#ddd] overflow-hidden">
          <NavLink
            to={`/profile`}
            end
            className={`block p-3 text-darktext border-b-[1px] border-b-solid border-b-[#ddd] hover:bg-hoverColor hover:text-white`}
          >
            Profile
          </NavLink>
          <NavLink
            to={`/profile/order`}
            end
            className={`block p-3 text-darktext hover:bg-hoverColor hover:text-white`}
          >
            Orders
          </NavLink>
        </div>
      </section>
      <section className="col-span-4 md:col-span-3">
        <Outlet />
      </section>
    </div>
  );
};

export default ProfileLayout;
