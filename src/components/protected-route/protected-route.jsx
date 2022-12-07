import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  const { state, pathname } = useLocation();
  if (!isAllowed) {
    return (
      <Navigate
        to={state && state.pathname ? state.pathname : redirectPath}
        replace
        state={{ pathname }}
      />
    );
  }
  return children ? children : <Outlet />;
};
