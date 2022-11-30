import { AppHeader } from "../app-header";
import { fetchIngredietns } from "../../services/actions/ingredients-actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Main } from "../../pages/main";
import { Login } from "../../pages/login/login";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { Register } from "../../pages/register/register";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { IngredientsModal } from "../../pages/ingredients-modal";
import { PageNotFound } from "../../pages/page-not-found";
import { Profile } from "../../pages/profile/profile";
import { ProtectedRoute } from "../protected-route";
import { fetchUserGet } from "../../services/actions/auth-actions";

export const App = () => {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredietns());
    dispatch(fetchUserGet());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route index element={<Main />} />
        <Route element={<ProtectedRoute isAllowed={!user} redirectPath="/" />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientsModal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
