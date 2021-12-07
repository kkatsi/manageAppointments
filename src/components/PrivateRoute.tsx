// PrivateRoute.tsx in v6
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../app/store";
// import { auth } from "../firebase";
import LoadingScreen from "./LoadingScreen";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  const userEmail = useSelector((state: RootState) => state.user.value.email);
  const loading = useSelector((state: RootState) => state.user.isLoading);
  let from = location.state?.from?.pathname || "/";

  if (loading) {
    return <LoadingScreen />;
  }
  if (userEmail === "") {
    if (location.pathname !== "/login")
      return <Navigate to="/login" state={{ from: location }} />;
  } else {
    if (location.pathname === "/login") return <Navigate to={from} />;
  }

  return children;
};

export default PrivateRoute;
