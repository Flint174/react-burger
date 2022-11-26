import { AppHeader } from "../app-header";
import { fetchIngredietns } from "../../services/actions/ingredients-actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Main } from "../../pages/main";
import { Login } from "../../pages/login/login";
import { ForgotPassword } from "../../pages/forgot-password";
import { Register } from "../../pages/register/register";
import { ResetPassword } from "../../pages/reset-password";
import { IngredientsModal } from "../../pages/ingredients-modal";
import { PageNotFound } from "../../pages/page-not-found";
import { Profile } from "../../pages/profile";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredietns());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route index element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
        <Route path="ingredients/:id" element={<IngredientsModal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
