import { FC, ReactElement } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
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
