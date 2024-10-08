// redux
import { useAppSelector } from "@store/hooks";
// react-router-dom
import { Navigate } from "react-router-dom";

// the purpose of this componet that the page that wrapped in cannot be reached if there is no access_token
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
