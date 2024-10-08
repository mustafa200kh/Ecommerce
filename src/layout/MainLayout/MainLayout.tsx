import { Footer, Header } from "@components/common";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <div className="bg-white dark:bg-darkthemeSec min-h-screen">
      <div className="container mx-auto bg-inherit ">
        <Header />
        <div className="wrapper">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
